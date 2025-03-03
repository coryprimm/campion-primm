import React from 'react';
import Image from 'next/image';

interface ImageGridProps {
    images: string[]; // Array of image URLs
    className?: string; // Optional className for styling
    style?: React.CSSProperties; // Optional inline styles
}

const GeminiBoxes: React.FC<ImageGridProps> = ({ images, className }) => {
    return (
        <div
            className={`bg-black text-white font-libre px-5 font-bold ${className || ''}`}
            style={{
                fontFamily: 'Libre Baskerville, Helvetica, Arial, sans-serif',
            }}
        >
            {/* Outer container centered with max width */}
            <div className="max-w-[800px] mx-auto">
                <div className="flex flex-wrap justify-center gap-2">
                    {images.map((url, index) => (
                        <div
                            key={index}
                            className="w-[calc(50%-5px)] max-w-[525px]" // Matches the layout in CategoryCardv3
                        >
                            <Image
                                src={url}
                                alt={`Image ${index + 1}`}
                                width={500} // Fixed width for images
                                height={500} // Fixed height for images
                                style={{
                                    objectFit: 'cover', // Ensures images are cropped correctly
                                    display: 'block', // Removes unwanted spacing
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeminiBoxes;
