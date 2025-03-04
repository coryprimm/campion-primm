import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SinglePhotoTitleList from '@/components/general/SinglePhotoTitleList';
import { Nav } from '../assets/mappings/imageMappings';
// @ts-ignore
import { reduceVIVmagData } from '@/assets/utilities';

const CategoryPage: React.FC = () => {
    const { category, subcategory } = useParams<{
        category: string;
        subcategory: string;
    }>();

    const decodedSubcategory = decodeURIComponent(subcategory || '');

    const [reducedData, setReducedData] = useState<
        Record<string, [string, string][]>
    >({});

    useEffect(() => {
        const fetchData = async () => {
            // @ts-ignore
            const reduced = await reduceVIVmagData(
                // @ts-ignore
                Nav[category.toLowerCase() as keyof typeof Nav]
            );
            setReducedData(reduced);
        };
        fetchData();
    }, []);

    const categoryData = reducedData[category?.toUpperCase() || ''];

    if (!categoryData) {
        return <div>Category not found</div>;
    }
    console.log(reducedData);

    return (
        <div>
            {categoryData.map(([subcategory, firstImage], index) => (
                <SinglePhotoTitleList
                    key={index}
                    title={decodedSubcategory}
                    items={[
                        {
                            url: `/images/${category}/${encodeURIComponent(decodedSubcategory)}/${firstImage}`,
                            title: decodedSubcategory,
                        },
                    ]}
                    category={''}
                    subcategory={''}
                />
            ))}
        </div>
    );
};

export default CategoryPage;
