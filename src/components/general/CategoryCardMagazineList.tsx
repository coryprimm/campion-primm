import React from 'react';
import CategoryCardMagazineCondensed from './CategoryCardMagazineCondensed';
import { BAinfo } from '../../assets/mappings/bonMappings';

interface CategoryCardMagazineListProps {
    categoryImages: { [key: string]: string[] };
}

const CategoryCardMagazineList: React.FC<CategoryCardMagazineListProps> = ({
    categoryImages,
}) => {
    const urls = ['travel', 'chefs', 'the_best'];
    return (
        <div className="bg-black space-y-10 ">
            {BAinfo.catTitleUrlslive.map((data, index) => {
                const title = Object.keys(data)[0];
                const images = categoryImages[title] || [];
                return (
                    <CategoryCardMagazineCondensed
                        key={index}
                        // @ts-ignore
                        data={data}
                        url={`/bonappetit/${urls[index]}`}
                        introImages={images}
                    />
                );
            })}
        </div>
    );
};

export default CategoryCardMagazineList;
