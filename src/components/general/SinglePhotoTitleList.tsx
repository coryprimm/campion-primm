import React from 'react';
import SinglePhotoTitle from './SinglePhotoTitle';

interface SinglePhotoTitleListProps {
    items: { url: string; title: string }[];
    title: string;
    category: string;
    subcategory: string;
}

const SinglePhotoTitleList: React.FC<SinglePhotoTitleListProps> = ({
    items,
    title,
    category,
    subcategory,
}) => {
    return (
        <div className="w-full bg-black text-white">
            <div className="space-y-4 sm:space-y-2">
                {items.map((item, index) => (
                    <SinglePhotoTitle
                        key={index}
                        items={[item]}
                        category={category}
                        subcategory={subcategory}
                    />
                ))}
            </div>
        </div>
    );
};

export default SinglePhotoTitleList;
