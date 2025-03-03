import React, { useState, useEffect } from 'react';
import { VIVinfo } from '../../assets/mappings/vivMappings';
import { urlNav } from '../../assets/mappings/bottomNav';
import Header from '@/components/Header';
import VIVMagCategories from '@/components/general/VivMagCategories';
import Navbar from '@/components/general/navbarElement/Navbar';
import FeaturedContent from '@/components/home/FeaturedContent';
import MiddleTextsNat from '@/components/general/MiddleTextsNat';
import FooterLinks from '@/components/FooterLinks';
import Footer from '@/components/Footer';
import GeminiBoxes from '@/components/general/GeminiBoxesv2';
import { fetchCloudflareImages } from '@/assets/utilities';

interface PageDataState {
    introImages: string[] | null;
    featuredImage: string | null;
    categoryImages: { [key: string]: string[] } | null;
    introLoading: boolean;
    featuredLoading: boolean;
    categoryLoading: boolean;
    introError: string | null;
    featuredError: string | null;
    categoryError: string | null;
}

const VIVMag: React.FC = () => {
    const [pageData, setPageData] = useState<PageDataState>({
        introImages: null,
        featuredImage: null,
        categoryImages: null,
        introLoading: true,
        featuredLoading: true,
        categoryLoading: true,
        introError: null,
        featuredError: null,
        categoryError: null,
    });

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            try {
                const introImages = await fetchCloudflareImages(
                    VIVinfo.introImgUrlslive
                );
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        introImages,
                        introLoading: false,
                    }));
                }
                const featuredImage = await fetchCloudflareImages([
                    VIVinfo.intro.photourllive,
                ]);
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        featuredImage: featuredImage[0] || null,
                        featuredLoading: false,
                    }));
                }
                const categoryImages: { [key: string]: string[] } = {};
                for (const data of VIVinfo.catTitleUrlslive) {
                    const title = Object.keys(data)[0];
                    const photos = data[title];
                    const fetchedImages = await fetchCloudflareImages(photos);
                    categoryImages[title] = fetchedImages;
                }
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        categoryImages,
                        categoryLoading: false,
                    }));
                }
            } catch (error) {
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        introLoading: false,
                        featuredLoading: false,
                        categoryLoading: false,
                        introError:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch intro images',
                        featuredError:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch featured image',
                        categoryError:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch category images',
                    }));
                }
            }
        };

        loadData();
        return () => {
            mounted = false;
        };
    }, []);
    const {
        introImages,
        featuredImage,
        categoryImages,
        introLoading,
        featuredLoading,
        categoryLoading,
        introError,
        featuredError,
        categoryError,
    } = pageData;
    const isLoading = introLoading || featuredLoading || categoryLoading;

    if (isLoading || !introImages || !featuredImage || !categoryImages) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <p className="text-white">Loading content...</p>
            </div>
        );
    }

    const hasIntroImages = introImages && introImages.length > 0;
    const hasCategoryImages =
        categoryImages && Object.keys(categoryImages).length > 0;
    if (introError && featuredError && categoryError) {
        return (
            <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
                <p className="text-xl mb-4">Unable to load content</p>
                <p className="text-sm opacity-70">
                    {introError && `Intro images error: ${introError}`}
                    {introError && featuredError && <br />}
                    {featuredError && `Featured image error: ${featuredError}`}
                    {(introError || featuredError) && categoryError && <br />}
                    {categoryError && `Category images error: ${categoryError}`}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
                >
                    Try Again
                </button>
            </div>
        );
    }
    return (
        <div className="bg-black">
            <Header />
            <Navbar />
            <div className="bg-black pt-[125px] sm:pt-[200px]"></div>
            <div className="bg-black">
                <div className="pb-20">
                    <FeaturedContent
                        title1={'VIVMAG'}
                        photoUrl={featuredImage || ''}
                        paragraph={VIVinfo.intro.paragraph}
                    />
                </div>

                {hasIntroImages ? (
                    <GeminiBoxes
                        images={introImages.filter(Boolean)}
                        className={'pb-20'}
                    />
                ) : (
                    <div className="pb-20 text-white text-center">
                        <p>
                            Intro images unavailable
                            {introError ? `: ${introError}` : ''}
                        </p>
                    </div>
                )}

                <div className="bg-black pt-[50px] pb-[95px]">
                    <MiddleTextsNat
                        title={VIVinfo.midtexts.title2}
                        subheading={VIVinfo.midtexts.title2a}
                        paragraphPrefix={VIVinfo.midtexts.midstatementPrefix}
                        stats={VIVinfo.midtexts.stats}
                    />
                </div>

                {hasCategoryImages && (
                    <VIVMagCategories categoryImages={categoryImages} />
                )}

                <div className="bg-black pt-[200px]"></div>
                <FooterLinks data={urlNav['/']} />
                <Footer />
            </div>
        </div>
    );
};

export default VIVMag;
