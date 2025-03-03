import React from 'react';
import GeminiBoxes from './GeminiBoxesv2';
import VerticalPhotoComponent from './VerticalPhotoComponent';

interface CategoryVertAndHorzProps {
    data: { [key: string]: string[] } | Record<string, string[]>;
    images: string[];
}

const CategoryVertAndHorz: React.FC<CategoryVertAndHorzProps> = ({
    data,
    images,
}) => {
    const title = Object.keys(data)[0];
    const hasImages = images && images.length > 0;

    if (!hasImages) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <p className="text-white">No images available.</p>
            </div>
        );
    }

    return (
        <>
            <div className="pb-2 bg-black">
                <VerticalPhotoComponent
                    title={title}
                    photos={images.slice(0, 3)} // Use the first 3 images
                />
            </div>
            <GeminiBoxes images={images.slice(3)} />{' '}
            {/* Use the remaining images */}
        </>
    );
};

export default CategoryVertAndHorz;
