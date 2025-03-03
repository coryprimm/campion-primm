import React from 'react';

interface DualHeaderComponentProps {
    title1: string;
    title2: string;
    paragraph: string;
}

const DualHeaderComponent: React.FC<DualHeaderComponentProps> = ({
    title1,
    title2,
    paragraph,
}) => {
    return (
        <div className="bg-black text-white text-center w-full overflow-hidden px-4 py-16">
            {/* Title Section */}
            <div className="mb-16">
                <h1
                    className="font-montserrat font-bold leading-none tracking-wide break-words px-2"
                    style={{ fontSize: 'clamp(3rem, 8vw, 10rem)' }}
                >
                    {title1}
                </h1>
                <h2
                    className="font-montserrat font-light tracking-wider mt-2 break-words px-2"
                    style={{ fontSize: 'clamp(1.25rem, 2.7vw, 4.17rem)' }}
                >
                    {title2}
                </h2>
            </div>

            <p className="text-left w-full max-w-[920px] mx-auto leading-[1.8] px-2 sm:px-6 text-[1rem] sm:text-[1.75rem] font-libre">
                {paragraph}
            </p>
        </div>
    );
};

export default DualHeaderComponent;
