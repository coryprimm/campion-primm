import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Nav } from '../../../assets/mappings/imageMappings';
import {
    getSurroundingItems,
    removeNumberUnderscore,
    getNatUrls,
} from '@/assets/utilities';
import SingleBoxes from '@/components/general/SingleBoxes';

import WellnessPage from '@/components/general/Wellness2';
import Header from '@/components/Header';
import Navbar from '@/components/general/navbarElement/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { urlNav } from '@/assets/mappings/bottomNav';
import Footer from '@/components/Footer';

const GenericNatPage: React.FC = () => {
    const router = useRouter();
    const { category } = router.query;

    const [pageState, setPageState] = useState({
        imageArrays: [] as { title: string; urls: string[] }[], // Updated type
        decodedCategory: null as string | null,
        isLoading: true,
        hasError: false,
        bottomUrls: [] as { url: string; title: string }[],
        shouldRenderWellness: false,
    });

    useEffect(() => {
        if (!router.isReady || typeof category !== 'string') return;

        const uppercaseCategory = category.toUpperCase();

        const fetchData = async () => {
            try {
                // Set initial loading state
                setPageState((prev) => ({
                    ...prev,
                    decodedCategory: uppercaseCategory,
                    isLoading: true,
                    hasError: false,
                }));
                const result = await getNatUrls(
                    uppercaseCategory,
                    Nav.naturalhealth
                );

                // Get bottom navigation URLs
                let urls = [] as { url: string; title: string }[];
                if (urlNav['/naturalhealth']) {
                    const navUrls = getSurroundingItems(
                        urlNav['/naturalhealth'],
                        uppercaseCategory
                    );

                    if (navUrls && navUrls.length > 0) {
                        // @ts-ignore
                        urls = navUrls;
                    }
                }
                setPageState((prev) => ({
                    ...prev,
                    imageArrays: [result],
                    bottomUrls: urls,
                    isLoading: false,
                    shouldRenderWellness: decodedCategory === 'WELLNESS',
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

    if (!router.isReady || !decodedCategory || imageArrays == null) {
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
        return <div>Error loading category data</div>;
    }

    if (decodedCategory === 'WELLNESS') {
        return (
            <WellnessPage imageArrays={imageArrays} bottomUrls={bottomUrls} />
        );
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-black pt-[125px] sm:pt-[200px]"></div>
            <div className="flex items-center justify-center bg-black">
                <h1 className="mt-[50px] text-white text-3xl font-bold text-center py-12 tracking-widest">
                    {removeNumberUnderscore(decodedCategory)}
                </h1>
            </div>
            <SingleBoxes urls={imageArrays.flatMap((item) => item.urls)} />
            <div className="bg-black pt-[200px]"></div>
            {bottomUrls && bottomUrls.length ? (
                <FooterLinks // @ts-ignore
                    data={bottomUrls}
                />
            ) : null}
            <Footer />
        </div>
    );
};
export default GenericNatPage;
