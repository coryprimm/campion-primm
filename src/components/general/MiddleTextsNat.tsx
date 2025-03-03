import React, { useEffect, useRef, useState } from 'react';

interface FeaturedSectionProps {
    title: string;
    subheading: string;
    stats: string[];
    paragraphPrefix: string;
}

const MiddleTextsNat: React.FC<FeaturedSectionProps> = ({
    title,
    subheading,
    paragraphPrefix,
    stats,
}) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    // Function to calculate and set the scale
    const calculateScale = () => {
        if (titleRef.current && containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const titleWidth = titleRef.current.scrollWidth;
            // Add some padding (10px on each side)
            const paddingWidth = 20;
            const availableWidth = containerWidth - paddingWidth;

            if (titleWidth > availableWidth) {
                const newScale = availableWidth / titleWidth;
                setScale(Math.min(1, newScale));
            } else {
                setScale(1);
            }
        }
    };

    // Recalculate on mount and when window resizes
    useEffect(() => {
        calculateScale();

        const handleResize = () => {
            calculateScale();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [title]);

    return (
        <div className="w-full px-4">
            <div className="max-w-3xl mx-auto text-white">
                <div
                    ref={containerRef}
                    className="overflow-hidden relative h-16 sm:h-20 flex items-center justify-center"
                >
                    <h2
                        ref={titleRef}
                        className="font-light font-eaves tracking-[.9em] text-3xl whitespace-nowrap absolute"
                        style={{
                            transform: `scale(${scale * 0.85})`,
                            transformOrigin: 'center center',
                        }}
                    >
                        {title}
                    </h2>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center font-montserrat">
                    {subheading}
                </h3>
                {/* <h3 className="text-xl sm:text-2xl md:text-3xl font-extralight mb-6 text-center py-2 font-eaves">
                    {paragraphPrefix}
                </h3> */}
                <div className="gap-x-6 text-xl sm:text-2xl md:text-3xl font-extralight text-center font-eaves py-2 block">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <h1
                                className="py-3 block"
                                style={{ display: 'inline-block' }}
                            >
                                {stat.trim()}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MiddleTextsNat;
