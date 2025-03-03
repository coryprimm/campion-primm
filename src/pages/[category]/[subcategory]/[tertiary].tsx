import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Nav } from '../../../assets/mappings/imageMappings';
import {
    chopOffDigitsAndUnderscore,
    getTertiaryVivUrls,
    getSurroundingItems,
    removeUnderscore,
} from '@/assets/utilities';
import SingleBoxes from '@/components/general/SingleBoxes';

import Header from '@/components/Header';
import Navbar from '@/components/general/navbarElement/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { urlNav } from '@/assets/mappings/bottomNav';
import Footer from '@/components/Footer';

const TertiaryPage: React.FC = () => {
    const router = useRouter();
    const { category, subcategory, tertiary } = router.query;
    const decodedCategory = category ? category.toString().toUpperCase() : '';
    const decodedSubcategory = subcategory
        ? decodeURIComponent(subcategory.toString())
        : '';
    const decodedTertiary = tertiary
        ? decodeURIComponent(tertiary.toString())
        : '';

    const [bottomUrls, setBottomUrls] = useState<
        { url: string; title: string }[]
    >([]);
    const [reducedData, setReducedData] = useState<
        { title: string; urls: string[] }[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        if (!router.isReady) return;

        const fetchAllData = async () => {
            setIsLoading(true);
            setHasError(false);

            if (category) {
                try {
                    const reduced = await getTertiaryVivUrls(
                        decodedCategory,
                        decodedSubcategory,
                        decodedTertiary,
                        Nav
                    );

                    if (!reduced || !Array.isArray(reduced.urls)) {
                        throw new Error(
                            'Invalid response from generateFileListForTertiary'
                        );
                    }

                    setReducedData([reduced]);
                    console.log('Main data fetching complete');
                } catch (error) {
                    console.error('Error fetching main data:', error);
                    setHasError(true);
                }
            }

            try {
                if (
                    decodedCategory &&
                    urlNav &&
                    Object.keys(urlNav).length > 0
                ) {
                    const navPath = `/VIV/${decodedSubcategory}`;

                    if (urlNav[navPath]) {
                        const urls = getSurroundingItems(
                            urlNav[navPath],
                            decodedTertiary
                        );
                        console.log(
                            'Successfully retrieved surrounding items URLs:',
                            urls
                        );
                        setBottomUrls(urls);
                    } else {
                        console.log(`urlNav entry for ${navPath} is undefined`);
                    }
                }
            } catch (error) {
                console.error(
                    'Error retrieving surrounding items URLs:',
                    error
                );
            }

            setIsLoading(false);
        };

        fetchAllData();
    }, [
        router.isReady,
        category,
        decodedCategory,
        decodedSubcategory,
        decodedTertiary,
    ]);

    if (hasError) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center"></div>
        );
    }

    if (reducedData.length === 0) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center"></div>
        );
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-black pt-[200px]"></div>
            <div className="flex items-center justify-center bg-black">
                <h1 className="mt-[50px] text-white text-3xl font-bold text-center py-12 tracking-widest">
                    {removeUnderscore(
                        chopOffDigitsAndUnderscore(
                            tertiary
                                ? tertiary.toUpperCase()
                                : subcategory.toUpperCase()
                        )
                    )}
                </h1>
            </div>
            <SingleBoxes
                urls={reducedData.flatMap((item) => item.urls || [])}
            />
            <div className="bg-black pt-[200px]"></div>
            {bottomUrls && bottomUrls.length ? (
                <FooterLinks data={bottomUrls} />
            ) : null}
            <Footer />
        </div>
    );
};

export default TertiaryPage;
