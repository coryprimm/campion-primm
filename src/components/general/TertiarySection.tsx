import React from 'react';
import SingleBoxes from '@/components/general/SingleBoxes';
import { removeNumberUnderscore } from '@/assets/utilities';

interface TertiarySectionProps {
    title: string;
    reducedData: { title: string; urls: string[] }[];
}

const TertiarySection: React.FC<TertiarySectionProps> = ({
    title,
    reducedData,
}) => {
    return (
        <div>
            <div className="flex items-center justify-center bg-black">
                <h1 className="mt-[20px] text-white text-3xl font-bold text-center py-12">
                    {removeNumberUnderscore(title.toUpperCase())}
                </h1>
            </div>
            <SingleBoxes urls={reducedData.flatMap((item) => item.urls)} />
        </div>
    );
};

export default TertiarySection;
