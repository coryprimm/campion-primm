import React from 'react';
import Link from 'next/link';

interface CategoryCardMagazineProps {
    data: { [key: string]: string[] } | Record<string, string[]>;
    url: string;
    introImages: string[]; // Add introImages as a prop
}

const CategoryCardMagazineCondensed: React.FC<CategoryCardMagazineProps> = ({
    data,
    url,
    introImages,
}) => {
    const title = Object.keys(data)[0];
    const displayTitle = title.replace(/_/g, ' '); // Format title

    // Check if we have valid image data
    const hasIntroImages = introImages && introImages.length > 0;

    return (
        <Link href={url}>
            <div className="bg-black text-white font-libre-baskerville px-5 font-bold pb-[70px] ">
                <h1 className="text-2xl text-center py-6 font-montserrat tracking-widest ">
                    {displayTitle}
                </h1>
                <div className="max-w-screen-lg mx-auto">
                    {/* First Image */}
                    {hasIntroImages && (
                        <div className="mb-4">
                            <img
                                src={introImages[0]}
                                alt="First Photo"
                                className="w-full max-w-[800px] mx-auto"
                            />
                        </div>
                    )}

                    {/* Subsequent Images in pairs */}
                    <div className="grid grid-cols-2 gap-4 max-w-[800px] mx-auto">
                        {introImages &&
                            introImages.slice(1).map((photo, index) => (
                                <div key={index} className="w-full">
                                    <img
                                        src={photo}
                                        alt={`Photo ${index + 2}`}
                                        className="w-full h-auto"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCardMagazineCondensed;
