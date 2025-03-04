import CategoryCardv3 from './CategoryCardv3';
import { NatInfo } from '../../assets/mappings/natMappings';
import Link from 'next/link';

interface CategoryCardListNatProps {
    categoryImages: { [key: string]: string[] };
}

const CategoryCardListNat: React.FC<CategoryCardListNatProps> = ({
    categoryImages,
}) => {
    return (
        <div className="bg-black pt-20">
            <div className="pb-20">
                <Link
                    href={`/naturalhealth/wellness`}
                    className="max-w-[800px] mb-10 pb-10"
                >
                    <CategoryCardv3
                        // @ts-ignore
                        data={NatInfo.specialCaselive}
                        images={
                            categoryImages[
                                Object.keys(NatInfo.specialCaselive)[0]
                            ]
                        }
                    />
                </Link>
            </div>

            <div className="pb-20">
                <Link
                    href={`/naturalhealth/fitness`}
                    className="max-w-[800px] mb-10 pb-10"
                >
                    <CategoryCardv3
                        // @ts-ignore
                        data={NatInfo.catTitleUrlslive[1]}
                        images={
                            categoryImages[
                                Object.keys(NatInfo.catTitleUrlslive[1])[0]
                            ]
                        }
                    />
                </Link>
            </div>

            <div className="pb-20">
                <Link
                    href={`/naturalhealth/nutrition`}
                    className="max-w-[800px] mb-10 pb-10"
                >
                    <CategoryCardv3
                        // @ts-ignore
                        data={NatInfo.catTitleUrlslive[2]}
                        images={
                            categoryImages[
                                Object.keys(NatInfo.catTitleUrlslive[2])[0]
                            ]
                        }
                        url={`/NATURALHEALTH/NUTRITION`}
                    />
                </Link>
            </div>

            <div className="pb-20">
                <Link
                    href={`/naturalhealth/style`}
                    className="max-w-[800px] mb-10 pb-10"
                >
                    <CategoryCardv3
                        // @ts-ignore
                        data={NatInfo.catTitleUrlslive[3]}
                        images={
                            categoryImages[
                                Object.keys(NatInfo.catTitleUrlslive[3])[0]
                            ]
                        }
                    />
                </Link>
            </div>
        </div>
    );
};

export default CategoryCardListNat;
