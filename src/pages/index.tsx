import React, { useState, useEffect } from 'react';
import Navbar from '@/components/general/navbarElement/Navbar';
import Header from '@/components/Header';
import DualHeaderComponent from '@/components/home/DualHeaderComponent';
import { introData } from '../assets/mappings/indexMappings';
import Footer from '@/components/Footer';
import FeaturedContentList from '@/components/home/FeaturedContentList';
import { fetchCloudflareImages } from '@/assets/utilities';

const Home: React.FC = () => {
    const [featuredImages, setFeaturedImages] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all featured images when the component mounts
    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            try {
                // Fetch featured images
                const featureInfo = introData.featureInfo;
                const sortedFeatures = Object.entries(featureInfo).sort(
                    ([, a], [, b]) => a.order - b.order
                );
                const imageUrls = await fetchCloudflareImages(
                    sortedFeatures.map(([, feature]) => feature.photourllive)
                );

                if (mounted) {
                    setFeaturedImages(imageUrls);
                    setLoading(false);
                }
            } catch (error) {
                if (mounted) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : 'Failed to fetch featured images'
                    );
                    setLoading(false);
                }
            }
        };

        loadData();

        // Cleanup function
        return () => {
            mounted = false;
        };
    }, []); // Empty dependency array ensures this runs only once

    // Check loading state
    if (loading || !featuredImages) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <p className="text-white">Loading content...</p>
            </div>
        );
    }

    // Show error message if fetching failed
    if (error) {
        return (
            <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
                <p className="text-xl mb-4">Unable to load content</p>
                <p className="text-sm opacity-70">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Main content
    return (
        <div className="bg-black h-screen flex flex-col justify-between">
            <div className="bg-black flex-grow">
                <Header />
                <Navbar />
                <div className="bg-black pt-[50px] sm:pt-[150px]"></div>
                <div className="bg-black">
                    <DualHeaderComponent
                        title1={introData.title1}
                        title2={introData.title2}
                        paragraph={introData.paragraph}
                    />
                    <FeaturedContentList featuredImages={featuredImages} />
                </div>
            </div>
            <h1>|{process.env.R2_BUCKET_NAME}|</h1>
            <Footer />
        </div>
    );
};

export default Home;
