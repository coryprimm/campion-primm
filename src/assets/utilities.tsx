import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Function to get signed URLs for a batch of images
// Used all over the place in place of hooks

// @ts-ignore
export async function fetchCloudflareImages(keys: string[]): Promise<string[]> {
    console.log('want to try');
    console.log(`$${process.env.ACCOUNT_ID} is my account`);
    try {
        const s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
            },
        });

        // Use Promise.allSettled to handle partial failures
        const results = await Promise.allSettled(
            keys.map(async (key) => {
                const command = new GetObjectCommand({
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: key,
                });

                return await getSignedUrl(s3Client, command, {
                    expiresIn: 6000,
                });
            })
        );

        // Filter out failures and return successful URLs
        return results
            .map((result, index) => {
                if (result.status === 'fulfilled') {
                    return result.value;
                }
                console.error(
                    `Failed to fetch image at index ${index}:`,
                    result.reason
                );
                return null;
            })
            .filter((url): url is string => url !== null);
    } catch (error) {
        console.error('Error fetching Cloudflare images:', error);
        return [];
    }
}

export async function getVivUrls(
    category: string,
    subcategory: string,
    data: Record<string, Record<string, Record<string, string[]>>>
) {
    const result: { title: string; url: string }[] = [];
    const cleanedSubcategory = subcategory.includes('%')
        ? decodeURIComponent(subcategory)
        : subcategory;
    const decodedCategory = decodeURIComponent(category).toLowerCase();
    const categoryData = data[decodedCategory];
    if (!categoryData) {
        console.error(`Category "${decodedCategory}" not found.`);
        return result;
    }
    const subcategoryData = categoryData[cleanedSubcategory.toUpperCase()];
    if (!subcategoryData) {
        console.error(
            `Subcategory "${cleanedSubcategory.toUpperCase()}" not found in category "${decodedCategory}".`
        );
        return result;
    }
    const fileKeys: string[] = [];
    const titles: string[] = [];

    for (const tertiaryCategory in subcategoryData) {
        const filelist = subcategoryData[tertiaryCategory];
        if (!filelist || filelist.length === 0) {
            continue;
        }
        const firstFile = filelist[0];
        const urlKey = `${decodedCategory}_${cleanedSubcategory.toUpperCase()}/${tertiaryCategory}/${firstFile}`;
        fileKeys.push(urlKey);
        titles.push(tertiaryCategory);
    }
    const signedUrls = await fetchCloudflareImagesTitled(fileKeys);
    for (let i = 0; i < titles.length; i++) {
        result.push({ title: titles[i], url: signedUrls[i] });
    }
    return result;
}

export async function getBonUrls(
    category: string,
    data: Record<string, string[]>
): Promise<string[][]> {
    const decodedCategory = decodeURIComponent(category).toUpperCase();

    // @ts-ignore
    const categoryData = data.bonappetit[decodedCategory];

    if (!categoryData) {
        console.error(
            `Category "${decodedCategory}" not found. in 163 function`
        );
        return [[''], ['']];
    }

    const interimurls = transformData(categoryData);

    const paths = prependImagePathlive(
        'bonappetit',
        decodedCategory,
        interimurls
    );
    const signedUrlArrays = await Promise.all(
        paths.map(async (pathArray) => {
            return await fetchCloudflareImages(pathArray);
        })
    );

    return signedUrlArrays;
}

export async function getNatUrls(
    category: string,
    data: Record<string, string[]>
): Promise<{ title: string; urls: string[] }> {
    const decodedCategory = decodeURIComponent(category).toUpperCase();
    const categoryData = data[decodedCategory];
    if (!categoryData) {
        console.error(`Category "${decodedCategory}" not found in data`);
        return { title: category, urls: [] };
    }
    try {
        const signedUrls = await fetchCloudflareImages(categoryData);
        return { title: category, urls: signedUrls };
    } catch (error) {
        console.error('Error fetching Cloudflare images:', error);
        return { title: category, urls: [] };
    }
}

export async function getTertiaryVivUrls(
    category: string,
    subcategory: string,
    tertiary: string,
    data: Record<string, Record<string, Record<string, string[]>>>
): Promise<{ title: string; urls: string[] }> {
    const cleanedCategory = decodeURIComponent(category).toLowerCase();
    const cleanedSubcategory = subcategory.includes('%')
        ? decodeURIComponent(subcategory)
        : subcategory;
    const cleanedTertiary = decodeURIComponent(tertiary);

    const categoryData = data[cleanedCategory];
    if (!categoryData) {
        console.error(`Category "${cleanedCategory}" not found.`);
        return { title: tertiary, urls: [] };
    }

    const subcategoryData = categoryData[cleanedSubcategory.toUpperCase()];
    if (!subcategoryData) {
        console.error(
            `Subcategory "${cleanedSubcategory.toUpperCase()}" not found in category "${cleanedCategory}".`
        );
        return { title: tertiary, urls: [] };
    }

    const fileList = subcategoryData[cleanedTertiary];
    if (!fileList || fileList.length === 0) {
        console.error(
            `Tertiary "${cleanedTertiary}" not found in subcategory "${cleanedSubcategory}".`
        );
        return { title: tertiary, urls: [] };
    }
    const fileKeys = fileList.map(
        (file) =>
            `${cleanedCategory}_${cleanedSubcategory.toUpperCase()}/${cleanedTertiary}/${file}`
    );
    const signedUrls = await fetchCloudflareImagesTitled(fileKeys);
    return { title: tertiary, urls: signedUrls };
}

// Helper functions

function prependImagePathlive(
    category: string,
    subcategory: string,
    fileArrays: string[][]
): string[][] {
    return fileArrays.map((array) =>
        array.map((file) => `${category}/${subcategory}/${file}`)
    );
}

// Function to get signed URLs for a batch of images

// @ts-ignore
async function fetchCloudflareImagesTitled(keys: string[]): Promise<string[]> {
    try {
        // @ts-ignore
        const s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
            },
        });

        const results = await Promise.allSettled(
            keys.map(async (key) => {
                const command = new GetObjectCommand({
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: key,
                });

                return await getSignedUrl(s3Client, command, {
                    expiresIn: 6000,
                });
            })
        );

        return results
            .map((result, index) => {
                if (result.status === 'fulfilled') {
                    return result.value;
                }
                console.error(
                    `Failed to fetch image at index ${index}:`,
                    result.reason
                );
                return null;
            })
            .filter((url): url is string => url !== null);
    } catch (error) {
        console.error('Error fetching Cloudflare images:', error);
        return [];
    }
}

function transformData(data: Record<string, []>): string[][] {
    return Object.values(data) // Get all category arrays
        .flat() // Flatten the category arrays (removes outer objects)
        .map((entry) => {
            const [folder, files] = Object.entries(entry)[0]; // Extract folder name and files
            return Array.isArray(files)
                ? files.map((file) => `${folder}/${file}`)
                : []; // Format path
        });
}

export function chopOffDigitsAndUnderscore(input: string): string {
    // Use a regular expression to match and remove leading digits and an underscore
    return input.replace(/^\d+_/, '');
}

export function removeNumberUnderscore(str: string): string {
    return str.replace(/(\d)_|_(?=\d)/g, '$1');
}

export function removeUnderscore(str: string): string {
    return str.replace(/_/g, ' ');
}

export function removeNumbers(str: string): string {
    return str.replace(/\d+/g, '');
}

//Used for bottom < > Navigation elements
export function getSurroundingItems(
    arr: [string, string][],
    target: string
): [[string, string], [string, string]] | [] {
    const length = arr.length;
    if (length === 0) return [];

    const index = arr.findIndex(([name]) => name === target);
    if (index === -1) {
        console.log('was not found 257');
        return [];
    } // Return empty if the target is not found

    const leftIndex = (index - 1 + length) % length;
    const rightIndex = (index + 1) % length;

    return [arr[leftIndex], arr[rightIndex]];
}
