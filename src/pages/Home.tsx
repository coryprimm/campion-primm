import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/home/Navbar';
import Header from '@/components/Header';
import DualHeaderComponent from '@/components/home/DualHeaderComponent';
import { introData } from '../assets/mappings/indexMappings';
import FeaturedContentList from '@/components/home/FeaturedContentList';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function Home() {
    return (
        <div>
            <Header />

            {/* <Navbar /> */}

            <DualHeaderComponent
                title1={introData.title1}
                title2={introData.title2}
                paragraph={introData.paragraph}
            />

            <FeaturedContentList />
        </div>
    );
}
