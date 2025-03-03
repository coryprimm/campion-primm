import React from 'react';
import Image from 'next/image';

interface PhotoComponentProps {
    title: string;
    photos: string[];
}

const PhotoComponent2: React.FC<PhotoComponentProps> = ({ title, photos }) => {
    return (
        <div className="bg-black text-white font-montserrat tracking-widest px-5 font-bold ">
            <h1 className="text-2xl text-center py-6 ">{title}</h1>
            <div className=" mx-auto flex max-w-[800px]">
                {/* Left Column */}
                <div className="w-2/3 pr-[6px] max-w-[800px]">
                    <Image
                        src={photos[0]}
                        alt="First Photo"
                        layout="responsive"
                        width={700}
                        height={400}
                    />
                </div>

                {/* Right Column */}
                <div className="w-1/3 flex flex-col justify-between">
                    <div className="relative h-1/2">
                        <Image
                            src={photos[1]}
                            alt="Second Photo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="relative h-1/2 mt-[6px]">
                        <Image
                            src={photos[2]}
                            alt="Third Photo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoComponent2;
