import Contact2 from '@/components/Contact2';
import Footer from '@/components/Footer';
import Navbar from '@/components/general/navbarElement/Navbar';
import Header from '@/components/Header';

const ContactPage: React.FC = () => {
    return (
        <div className="bg-black">
            <Header />

            <Navbar />
            <div className="bg-black pt-[25px] sm:pt-[100px]"></div>
            <Contact2 />
            <Footer />
        </div>
    );
};

export default ContactPage;
