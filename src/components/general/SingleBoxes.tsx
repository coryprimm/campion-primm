import React from 'react';

interface SingleBoxesProps {
    urls: string[];
    tightSpacing?: boolean;
}

const SingleBoxes: React.FC<SingleBoxesProps> = ({ urls }) => {
    return (
        <div className="w-full h-full bg-black">
            <div className="mx-auto px-4 py-6">
                <div className="grid grid-cols-1 gap-4">
                    {urls.map((url, index) => (
                        <div key={index} className="flex justify-center">
                            <img
                                src={url}
                                alt={`photo-${index}`}
                                className="w-full h-auto object-cover max-w-[800px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleBoxes;
