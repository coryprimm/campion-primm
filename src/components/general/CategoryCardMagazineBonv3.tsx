import React from 'react';

interface CategoryCardMagBonProps {
    data: string[];
}

const CategoryCardMagBon: React.FC<CategoryCardMagBonProps> = ({ data }) => {
    return (
        <div className="pb-16 bg-black">
            <div className="bg-black text-white font-libre-baskerville px-5 font-bold">
                <div className="max-w-screen-lg mx-auto">
                    {/* Featured/Main Image */}
                    {data.length > 0 && (
                        <div className="flex justify-center w-full mb-8">
                            <div
                                className="max-w-[800px] w-full"
                                style={{
                                    filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.5))',
                                }}
                            >
                                <img
                                    src={data[0]}
                                    alt="Featured Image"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    )}

                    {/* Grid for remaining images - Mobile & Tablet (same for both) */}
                    <div className="grid grid-cols-2 gap-4 max-w-[800px] mx-auto lg:grid-cols-2">
                        {data.slice(1).map((photo, index) => (
                            <div
                                key={index}
                                className="w-full"
                                style={{
                                    filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.5))',
                                }}
                            >
                                <img
                                    src={photo}
                                    alt={`Image ${index + 2}`}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCardMagBon;
