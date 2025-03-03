import React, { useState, useEffect } from 'react';
import { BAinfo } from '../../assets/mappings/bonMappings';
import SingleBoxes from '@/components/general/SingleBoxes';
import Header from '@/components/Header';
import CategoryCardMagazineList from '@/components/general/CategoryCardMagazineList';
import Navbar from '@/components/general/navbarElement/Navbar';
import FeaturedContent from '@/components/home/FeaturedContent';
import MiddleTextsNat from '@/components/general/MiddleTextsNat';
import FooterLinks from '@/components/FooterLinks';
import Footer from '@/components/Footer';
import GeminiBoxes from '@/components/general/GeminiBoxesv2';
import { fetchCloudflareImages } from '@/assets/utilities';

interface PageDataState {
    introImages: string[] | null;
    spreads: string[] | null;
    featuredImage: string | null;
    introLoading: boolean;
    spreadsLoading: boolean;
    featuredLoading: boolean;
    introError: string | null;
    spreadsError: string | null;
    featuredError: string | null;
    categoryImages: { [key: string]: string[] } | null;
}

const BonAppetit: React.FC = () => {
    const [pageData, setPageData] = useState<PageDataState>({
        introImages: null,
        spreads: null,
        featuredImage: null,
        introLoading: true,
        spreadsLoading: true,
        featuredLoading: true,
        introError: null,
        spreadsError: null,
        featuredError: null,
        categoryImages: null,
    });

    const bottomUrls = [
        ['Natural Health', '/naturalhealth'],
        ['VIVMag', '/vivmag'],
    ];

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            try {
                const introImages = await fetchCloudflareImages(
                    BAinfo.introImgUrlslive
                );
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        introImages,
                        introLoading: false,
                    }));
                }
                const spreads = await fetchCloudflareImages(BAinfo.spreadslive);
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        spreads,
                        spreadsLoading: false,
                    }));
                }
                const featuredImage = await fetchCloudflareImages([
                    BAinfo.intro.photourllive,
                ]);
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        featuredImage: featuredImage[0] || null,
                        featuredLoading: false,
                    }));
                }
                const categoryImages: { [key: string]: string[] } = {};
                for (const data of BAinfo.catTitleUrlslive) {
                    const title = Object.keys(data)[0];
                    const photos = data[title];
                    const fetchedImages = await fetchCloudflareImages(photos);
                    categoryImages[title] = fetchedImages;
                }
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        categoryImages,
                    }));
                }
            } catch (error) {
                if (mounted) {
                    setPageData((prev) => ({
                        ...prev,
                        introLoading: false,
                        spreadsLoading: false,
                        featuredLoading: false,
                        introError:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch intro images',
                        spreadsError:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch spreads',
                        featuredError:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch featured image',
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
        spreads,
        featuredImage,
        introLoading,
        spreadsLoading,
        featuredLoading,
        introError,
        spreadsError,
        featuredError,
        categoryImages,
    } = pageData;
    const isLoading = introLoading || spreadsLoading || featuredLoading;

    if (isLoading || !introImages || !featuredImage || !categoryImages) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <p className="text-white">Loading content...</p>
            </div>
        );
    }

    const hasIntroImages = introImages && introImages.length > 0;
    const hasSpreads = spreads && spreads.length > 0;

    // Show error message if all image sets failed to load
    if (introError || spreadsError || featuredError) {
        return (
            <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
                <p className="text-xl mb-4">Unable to load content</p>
                <p className="text-sm opacity-70">
                    {introError && `Intro images error: ${introError}`}
                    {introError && spreadsError && <br />}
                    {spreadsError && `Spread images error: ${spreadsError}`}
                    {(introError || spreadsError) && featuredError && <br />}
                    {featuredError && `Featured image error: ${featuredError}`}
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
        <>
            <Header />
            <Navbar />
            <div className="bg-black pt-[125px] sm:pt-[200px]"></div>
            <div className="bg-black">
                <div className="pb-20">
                    <FeaturedContent
                        photoUrl={featuredImage || ''}
                        paragraph={BAinfo.intro.paragraph}
                        title1={'BON APPÉTIT'}
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

                <div className="pt-[50px] pb-[100px]">
                    <MiddleTextsNat
                        title={BAinfo.midtexts.title2}
                        subheading={BAinfo.midtexts.title2a}
                        paragraphPrefix={BAinfo.midtexts.midstatementPrefix}
                        stats={BAinfo.midtexts.stats}
                    />
                </div>

                <div className="flex items-center justify-center bg-black">
                    {hasSpreads ? (
                        <SingleBoxes urls={spreads.filter(Boolean)} />
                    ) : (
                        <div className="pb-20 text-white text-center">
                            <p>
                                Spread images unavailable
                                {spreadsError ? `: ${spreadsError}` : ''}
                            </p>
                        </div>
                    )}
                </div>

                <div className="pt-[100px]">
                    <CategoryCardMagazineList categoryImages={categoryImages} />
                </div>

                <div className="bg-black pt-[200px]"></div>
                {bottomUrls.length ? <FooterLinks data={bottomUrls} /> : null}
                <Footer />
            </div>
        </>
    );
};

export default BonAppetit;
