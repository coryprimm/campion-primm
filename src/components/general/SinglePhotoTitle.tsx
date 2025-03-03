import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    chopOffDigitsAndUnderscore,
    removeNumbers,
    removeUnderscore,
} from '../../assets/utilities';

interface SinglePhotoTitleProps {
    items: { url: string; title: string }[]; // Array of objects containing url and title
    category: string;
    subcategory: string;
}

const SinglePhotoTitle: React.FC<SinglePhotoTitleProps> = ({
    items,
    category,
    subcategory,
}) => {
    console.log(items[0].title);

    console.log(items[0].url);
    console.log('inside single photo title');
    return (
        <div className="w-full h-full bg-black">
            <div className="mx-auto px-8 py-3 max-w-[800px]">
                <div className="grid grid-cols-1 gap-0">
                    {items.map((item, index) => (
                        <div key={index} className="w-full">
                            <Link
                                href={`/${category}/${subcategory}/${encodeURIComponent(item.title)}`}
                                className="block"
                            >
                                <Image
                                    src={item.url.replace(/[^\x20-\x7E]/g, '')}
                                    alt={item.title}
                                    layout="responsive"
                                    width={1200}
                                    height={800}
                                    className="object-cover"
                                />
                            </Link>
                            <div className="w-full flex justify-center">
                                <div className="max-w-[800px]">
                                    <p className="mt-[30px] text-white text-[19px] text-center tracking-widest font-bold mb-8">
                                        {removeNumbers(
                                            removeUnderscore(
                                                chopOffDigitsAndUnderscore(
                                                    item.title.toUpperCase()
                                                )
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="h-3"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SinglePhotoTitle;
