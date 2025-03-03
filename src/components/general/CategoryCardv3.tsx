import React from 'react';

interface CategoryCardv3Props {
    data: { [key: string]: string[] } | Record<string, string[]>;
    images: string[];
}

const CategoryCardv3: React.FC<CategoryCardv3Props> = ({ data, images }) => {
    const title = Object.keys(data)[0];
    const hasImages = images && images.length > 0;

    return (
        <div className="bg-black text-white px-5 font-bold">
            <h1 className="text-2xl text-center py-6 font-montserrat tracking-widest">
                {title}
            </h1>
            <div className="max-w-screen-lg mx-auto max-w-[800px]">
                {hasImages && (
                    <div className="w-full mb-2">
                        <img
                            src={images[0]}
                            alt="First Photo"
                            className="w-full max-w-[800px] mx-auto"
                        />
                    </div>
                )}
                <div className="flex flex-wrap justify-center gap-2">
                    {hasImages &&
                        images.slice(1).map((photo, index) => (
                            <div
                                key={index}
                                className="w-[calc(50%-5px)] max-w-[400px]"
                            >
                                <img
                                    src={photo}
                                    alt={`Photo ${index + 2}`}
                                    className="w-full"
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCardv3;
