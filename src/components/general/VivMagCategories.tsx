import { VIVinfo } from '../../assets/mappings/vivMappings';
import Link from 'next/link';
import CategoryCardv3 from './CategoryCardv3';
import CategoryVertAndHorz from './CategoryVertAndHorz';

interface VIVMagCategoriesProps {
    categoryImages: { [key: string]: string[] };
}

const VIVMagCategories: React.FC<VIVMagCategoriesProps> = ({
    categoryImages,
}) => {
    return (
        <>
            <div className="pb-20">
                <Link href={`/viv/STYLE`} className="max-w-[800px] mb-10 pb-10">
                    <CategoryCardv3
                        // @ts-ignore
                        data={VIVinfo.catTitleUrlslive[0]}
                        images={
                            categoryImages[
                                Object.keys(VIVinfo.catTitleUrlslive[0])[0]
                            ]
                        }
                    />
                </Link>
            </div>

            <div className="pb-20">
                <Link
                    href={`/viv/BEAUTY`}
                    className="max-w-[800px] mb-10 pb-10"
                >
                    <CategoryVertAndHorz
                        // @ts-ignore
                        data={VIVinfo.catTitleUrlslive[1]}
                        images={
                            categoryImages[
                                Object.keys(VIVinfo.catTitleUrlslive[1])[0]
                            ]
                        }
                    />
                </Link>
            </div>

            <Link href={`/viv/WELLNESS`} className="max-w-[800px] mb-10 pb-10">
                <CategoryCardv3
                    // @ts-ignore
                    data={VIVinfo.catTitleUrlslive[2]}
                    images={
                        categoryImages[
                            Object.keys(VIVinfo.catTitleUrlslive[2])[0]
                        ]
                    }
                />
            </Link>
        </>
    );
};

export default VIVMagCategories;
