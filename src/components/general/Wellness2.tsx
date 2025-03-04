import React, { useEffect, useState } from 'react';
import SingleBoxes from '@/components/general/SingleBoxes';

import GeminiBoxes from '@/components/general/GeminiBoxesv3';
import Navbar from './navbarElement/Navbar';
import FooterLinks from '../FooterLinks';
import Footer from '../Footer';

interface WellnessPageProps {
    imageArrays: { title: string; urls: string[] }[];
    bottomUrls: { url: string; title: string }[];
}

const WellnessPage: React.FC<WellnessPageProps> = ({
    imageArrays,
    bottomUrls,
}) => {
    if (!imageArrays.length) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center"></div>
        );
    }

    let allUrls = imageArrays[0].urls;
    let firstUrls = allUrls.slice(0, 4);
    let secondUrls = allUrls.slice(4, 10);
    let thirdUrls = allUrls.slice(10);

    return (
        <div>
            <Navbar />
            <div className="bg-black pt-[50px] sm:pt-[150px]"></div>
            <div className="flex items-center justify-center bg-black">
                <h1 className="text-white text-3xl font-bold text-center py-12 tracking-widest">
                    WELLNESS
                </h1>
            </div>
            <SingleBoxes urls={firstUrls} />
            <GeminiBoxes images={secondUrls} />
            <SingleBoxes urls={thirdUrls} />
            <div className="bg-black pt-[200px]"></div>
            {bottomUrls.length > 0 && (
                <FooterLinks
                    // @ts-ignore
                    data={bottomUrls}
                />
            )}
            <Footer />
        </div>
    );
};

export default WellnessPage;
