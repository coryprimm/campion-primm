import {
    chopOffDigitsAndUnderscore,
    removeUnderscore,
} from '@/assets/utilities';
import React from 'react';

interface Props {
    data: [string, string][]; // Array of tuples: [[title1, url1], [title2, url2]]
}

const Component: React.FC<Props> = ({ data }) => {
    const [first, second] = data || []; // Ensure data is at least an empty array

    if (!first || !second) {
        console.log('Invalid data structure:', data);
        return null; // Return early if data is not valid
    }
    const [firstFiltered, secondFiltered] = [
        removeUnderscore(chopOffDigitsAndUnderscore(first[0])),
        removeUnderscore(chopOffDigitsAndUnderscore(second[0])),
    ];

    return (
        <div className="bg-black text-white w-full">
            <div className="px-6 md:px-10">
                {' '}
                <div className="max-w-[800px] mx-auto flex justify-between items-center font-montserrat">
                    <div className="flex items-center">
                        <span className="text-2xl font-thin mr-2">&lt;</span>
                        <a
                            href={first[1]}
                            className="text-white no-underline hover:underline"
                        >
                            {firstFiltered}
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a
                            href={second[1]}
                            className="text-white no-underline hover:underline"
                        >
                            {secondFiltered}
                        </a>
                        <span className="text-2xl font-thin ml-2">&gt;</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Component;
