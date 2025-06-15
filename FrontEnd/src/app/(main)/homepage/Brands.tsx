import Image from "next/image";
import React from "react";

const brandsData: { id: string; src: string }[] = [
    {
        id: "versace",
        src: "/images/versace-logo.svg",
    },
    {
        id: "zara",
        src: "/images/zara-logo.svg",
    },
    {
        id: "gucci",
        src: "/images/gucci-logo.svg",
    },
    {
        id: "prada",
        src: "/images/prada-logo.svg",
    },
    {
        id: "calvin-klein",
        src: "/images/calvin-klein-logo.svg",
    },
];

const Brands = () => {
    return (
        <div className="bg-black w-full h-auto min-h-[122px] flex items-center justify-center py-8 md:py-5">
            <div className="max-w-frame mx-auto sm:px-4 xl:px-0">
                {/* Desktop layout */}
                <div className="hidden md:flex flex-wrap items-center justify-between gap-x-32 gap-y-6">
                    {brandsData.map((brand) => (
                        <div
                            key={brand.id}
                            className={`relative ${brand.id === 'zara'
                                    ? 'w-[63.81px] h-[26.65px]'
                                    : brand.id === 'gucci'
                                        ? 'w-[109.39px] h-[25.24px]'
                                        : brand.id === 'prada'
                                            ? 'w-[127px] h-[21px]'
                                            : brand.id === 'calvin-klein'
                                                ? 'w-[134.84px] h-[21.75px]'
                                                : 'w-[156px] h-[36px]'
                                }`}
                        >
                            <Image
                                priority
                                src={brand.src}
                                alt={brand.id}
                                fill
                                className="object-contain filter brightness-0 invert"
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile layout */}
                <div className="md:hidden">
                    {/* First row - 3 logos */}
                    <div className="flex items-center justify-center gap-x-8 mb-8">
                        {brandsData.slice(0, 3).map((brand) => (
                            <div
                                key={brand.id}
                                className={`relative ${brand.id === 'versace'
                                        ? 'w-[116.74px] h-[23.25px]'
                                        : brand.id === 'zara'
                                            ? 'w-[63.81px] h-[26.65px]'
                                            : brand.id === 'gucci'
                                                ? 'w-[109.39px] h-[25.24px]'
                                                : 'w-[80px] h-[24px] sm:w-[100px] sm:h-[28px]'
                                    }`}
                            >
                                <Image
                                    priority
                                    src={brand.src}
                                    alt={brand.id}
                                    fill
                                    className="object-contain filter brightness-0 invert"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Second row - 2 logos */}
                    <div className="flex items-center justify-center gap-x-8">
                        {brandsData.slice(3, 5).map((brand) => (
                            <div
                                key={brand.id}
                                className={`relative ${brand.id === 'prada'
                                        ? 'w-[127px] h-[21px]'
                                        : brand.id === 'calvin-klein'
                                            ? 'w-[134.84px] h-[21.75px]'
                                            : 'w-[80px] h-[24px] sm:w-[100px] sm:h-[28px]'
                                    }`}
                            >
                                <Image
                                    priority
                                    src={brand.src}
                                    alt={brand.id}
                                    fill
                                    className="object-contain filter brightness-0 invert"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;