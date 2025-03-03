import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Nav } from '../../../assets/mappings/imageMappings';
import {
    chopOffDigitsAndUnderscore,
    getSurroundingItems,
    getVivUrls,
    removeNumbers,
    removeUnderscore,
} from '@/assets/utilities';
import SinglePhotoTitleList from '@/components/general/SinglePhotoTitleList';

import Header from '@/components/Header';
import Navbar from '@/components/general/navbarElement/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { urlNav } from '@/assets/mappings/bottomNav';
import Footer from '@/components/Footer';

const CategoryPage: React.FC = () => {
    const router = useRouter();
    const { category, subcategory } = router.query;
    const [pageState, setPageState] = useState({
        reducedData: [] as { title: string; url: string }[],
        bottomUrls: [] as { url: string; title: string }[],
        decodedCategory: '',
        decodedSubcategory: '',
        isLoading: true,
        hasError: false,
    });

    useEffect(() => {
        if (!router.isReady || !category || !subcategory) return;

        const decodedCategory = category.toString().toUpperCase();
        const decodedSubcategory = decodeURIComponent(subcategory.toString());

        const fetchData = async () => {
            try {
                setPageState((prev) => ({
                    ...prev,
                    decodedCategory,
                    decodedSubcategory,
                    isLoading: true,
                    hasError: false,
                }));
                const reduced = await getVivUrls(
                    decodedCategory,
                    decodedSubcategory,
                    Nav
                );

                let urls = [] as { url: string; title: string }[];
                if (urlNav['/viv']) {
                    urls = getSurroundingItems(
                        urlNav['/viv'],
                        `${decodedSubcategory.toUpperCase()}`
                    );
                }

                setPageState((prev) => ({
                    ...prev,
                    reducedData: reduced,
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
    }, [router.isReady, category, subcategory]);

    const {
        reducedData,
        bottomUrls,
        decodedCategory,
        decodedSubcategory,
        isLoading,
        hasError,
    } = pageState;

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

    if (reducedData.length === 0) {
        return <div>Category not found</div>;
    }

    const newSub = removeUnderscore(
        chopOffDigitsAndUnderscore(subcategory.toUpperCase())
    );
    if (
        !router.isReady ||
        !decodedCategory ||
        !decodedSubcategory ||
        decodedCategory == '' ||
        decodedSubcategory == ''
    ) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center"></div>
        );
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-black pt-[125px] sm:pt-[200px]"></div>
            <div className="flex items-center justify-center bg-black ">
                <h1 className=" text-white text-3xl font-bold text-center py-12 tracking-widest">
                    {newSub}
                </h1>
            </div>
            {reducedData.map(({ title, url }, index) => (
                <SinglePhotoTitleList
                    key={index}
                    title={removeNumbers(
                        removeUnderscore(chopOffDigitsAndUnderscore(title))
                    )}
                    items={[
                        {
                            url,
                            title,
                        },
                    ]}
                    category={decodedCategory}
                    subcategory={decodedSubcategory}
                />
            ))}
            <div className="bg-black pt-[200px]"></div>
            {bottomUrls && bottomUrls.length ? (
                <FooterLinks data={bottomUrls} />
            ) : null}

            <Footer />
        </div>
    );
};

export default CategoryPage;
