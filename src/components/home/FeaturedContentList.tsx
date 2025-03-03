import React from 'react';
import { introData } from '../../assets/mappings/indexMappings';
import Link from 'next/link';
import FeaturedContent from '@/components/home/FeaturedContent';

interface FeaturedContentListProps {
    featuredImages: string[];
}

const FeaturedContentList: React.FC<FeaturedContentListProps> = ({
    featuredImages,
}) => {
    const featureInfo = introData.featureInfo;
    const sortedFeatures = Object.entries(featureInfo).sort(
        ([, a], [, b]) => a.order - b.order
    );
    const companyUrls = ['vivmag', 'naturalhealth', 'bonappetit'];

    return (
        <div className="pb-[100px] bg-black">
            {companyUrls.map((companyUrl, index) => {
                const [key, feature] = sortedFeatures[index];
                const imageUrl = featuredImages[index];

                return (
                    <Link href={`/${companyUrl}`} key={key}>
                        <FeaturedContent
                            photoUrl={imageUrl || ''}
                            title1={feature.title1}
                            paragraph={feature.paragraph}
                        />
                    </Link>
                );
            })}
        </div>
    );
};

export default FeaturedContentList;
