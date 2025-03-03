import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Nav } from '../../../assets/mappings/imageMappings';
import {
    getBonUrls,
    getSurroundingItems,
    removeUnderscore,
} from '@/assets/utilities';

import GeminiBoxes from '@/components/general/GeminiBoxesv3';
import CategoryCardMagBonv3 from '@/components/general/CategoryCardMagazineBonv3';
import Header from '@/components/Header';
import Navbar from '@/components/general/navbarElement/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { urlNav } from '@/assets/mappings/bottomNav';
import Footer from '@/components/Footer';

const GenericBonPage: React.FC = () => {
    const router = useRouter();
    const { category } = router.query;

    const [pageState, setPageState] = useState({
        imageArrays: [] as string[][],
        decodedCategory: null as string | null,
        isLoading: true,
        hasError: false,
        bottomUrls: [] as { url: string; title: string }[],
    });

    useEffect(() => {
        if (!router.isReady || typeof category !== 'string') return;

        const uppercaseCategory = category.toUpperCase();

        const fetchData = async () => {
            try {
                setPageState((prev) => ({
                    ...prev,
                    decodedCategory: uppercaseCategory,
                    isLoading: true,
                    hasError: false,
                }));

                const result = await getBonUrls(uppercaseCategory, Nav);

                // Get bottom navigation URLs
                let urls = [] as { url: string; title: string }[];
                if (urlNav['/bonappetit']) {
                    const navUrls = getSurroundingItems(
                        urlNav['/bonappetit'],
                        uppercaseCategory
                    );

                    if (navUrls && navUrls.length > 0) {
                        urls = navUrls;
                    }
                }

                // Update state with all fetched data
                setPageState((prev) => ({
                    ...prev,
                    imageArrays: result,
                    bottomUrls: urls,
                    isLoading: false,
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
                setPageState((prev) => ({
                    ...prev,
                    hasError: true,
                    isLoading: false,
                }));
            }
        };

        fetchData();
    }, [router.isReady, category]);

    const { imageArrays, decodedCategory, isLoading, hasError, bottomUrls } =
        pageState;

    if (!router.isReady || !decodedCategory) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center"></div>
        );
    }

    if (isLoading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center"></div>
        );
    }

    if (hasError) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center"></div>
        );
    }

    const firstUrls = imageArrays.slice(0, 1);
    const restOfUrls = imageArrays.slice(1);

    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-black pt-[50px] sm:pt-[100px]"></div>
            <div className="bg-black">
                <div className="flex items-center justify-center bg-black">
                    <h1 className="mt-[50px] text-white text-3xl font-bold text-center py-12 tracking-widest">
                        {removeUnderscore(decodedCategory)}
                    </h1>
                </div>
                <div className="pb-[100px]">
                    {firstUrls.map((imageArray, index) => (
                        <GeminiBoxes
                            key={index}
                            images={imageArray}
                            className="pb-20"
                        />
                    ))}
                </div>

                <div className="bg-black">
                    {restOfUrls.map((imageArray, index) => (
                        <CategoryCardMagBonv3 key={index} data={imageArray} />
                    ))}
                </div>
            </div>
            <div className="bg-black pt-[200px]"></div>
            {bottomUrls.length > 0 && <FooterLinks data={bottomUrls} />}
            <Footer />
        </div>
    );
};

export default GenericBonPage;
