import React from 'react';
import Image from 'next/image';
import { StaticImageData } from '../../../node_modules/next/image';

interface FeaturedContentProps {
    photoUrl: string | StaticImageData;
    title1: string;
    title2?: string;
    paragraph: string;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({
    photoUrl,
    title1,
    title2,
    paragraph,
}) => {
    console.log(photoUrl);
    console.log('in featured content');
    return (
        <div className="bg-black text-white text-center p-8 pb-20">
            <Image
                src={photoUrl}
                width={560}
                height={760}
                alt="Featured"
                className="w-full max-w-[560px] max-h-[760px] mx-auto mb-2"
            />

            <div className="space-y-2 mt-[60px] ">
                <h1 className="text-2xl font-bold font-montserrat pb-[30px] tracking-[0.1em]">
                    {title1}
                </h1>
            </div>

            <p className="text-left max-w-[560px] mx-auto font-libre leading-[2]">
                {paragraph}
            </p>
        </div>
    );
};

export default FeaturedContent;
