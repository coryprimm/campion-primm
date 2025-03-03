import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white p-6 md:p-10 font-[Montserrat] text-xs md:text-sm">
            <div className="max-w-[800px] mx-auto">
                <hr className="border-white mb-4 w-full" />{' '}
                {/* Full-width HR */}
                <h2 className="text-lg font-bold mb-8">CAMPION</h2>
                <div className="flex flex-wrap justify-between">
                    <div className="flex space-x-6 md:space-x-12">
                        {/* VIVMAG Section */}
                        <div>
                            <Link href={`/vivmag`}>
                                <h3 className="font-semibold mb-2">VIVMAG</h3>
                            </Link>
                            <ul className="space-y-2 sm:space-y-0.5">
                                {[
                                    // { name: 'Home', link: '/vivmag' },
                                    { name: 'Style', link: '/viv/style' },
                                    { name: 'Beauty', link: '/viv/beauty' },
                                    {
                                        name: 'Wellness',
                                        link: '/viv/wellness',
                                    },
                                ].map(({ name, link }) => (
                                    <li key={name}>
                                        <a
                                            href={link}
                                            className="hover:underline"
                                        >
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* BON APPÉTIT Section */}
                        <div>
                            <Link href={`/bonappetit`}>
                                <h3 className="font-semibold mb-2">
                                    BON APPÉTIT
                                </h3>
                            </Link>
                            <ul className="space-y-2 sm:space-y-0.5">
                                {[
                                    // { name: 'Home', link: '/bonappetit' },
                                    {
                                        name: 'Travel',
                                        link: '/bonappetit/travel',
                                    },
                                    {
                                        name: 'Chefs',
                                        link: '/bonappetit/chefs',
                                    },
                                    {
                                        name: 'The Best',
                                        link: '/bonappetit/the_best',
                                    },
                                ].map(({ name, link }) => (
                                    <li key={name}>
                                        <a
                                            href={link}
                                            className="hover:underline"
                                        >
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* NATURAL HEALTH Section */}
                        <div>
                            <Link href={`/naturalhealth`}>
                                <h3 className="font-semibold mb-2">
                                    NATURAL HEALTH
                                </h3>
                            </Link>
                            <ul className="space-y-2 sm:space-y-0.5">
                                {[
                                    // {
                                    //     name: 'Home',
                                    //     link: '/naturalhealth',
                                    // },
                                    {
                                        name: 'Wellness',
                                        link: '/naturalhealth/wellness',
                                    },
                                    {
                                        name: 'Fitness',
                                        link: '/naturalhealth/fitness',
                                    },
                                    {
                                        name: 'Nutrition',
                                        link: '/naturalhealth/nutrition',
                                    },
                                    {
                                        name: 'Style',
                                        link: '/naturalhealth/style',
                                    },
                                ].map(({ name, link }) => (
                                    <li key={name}>
                                        <a
                                            href={link}
                                            className="hover:underline"
                                        >
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-4 md:mt-0 md:ml-16">
                        <h3 className="font-semibold mb-2">CONTACT</h3>
                        <a
                            href="mailto:primm@me.com"
                            className="hover:underline"
                        >
                            primm@me.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
