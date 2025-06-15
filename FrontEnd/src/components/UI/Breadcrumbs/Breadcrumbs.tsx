'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(Boolean); 
    console.log('📍 Breadcrumbs pathname:', pathname);

    const crumbs = pathParts.map((part, index) => {
        const href = '/' + pathParts.slice(0, index + 1).join('/');
        const label = decodeURIComponent(part.charAt(0).toUpperCase() + part.slice(1));
        const isLast = index === pathParts.length - 1;

        return (
            <span key={href} className="flex items-center">
                {!isLast ? (
                    <>
                        <Link
                            href={href}
                            className="text-[#666] hover:underline font-[400] text-[16px] leading-[100%] tracking-[0] font-[Satoshi]"
                        >
                            {label}
                        </Link>
                        <span className="mx-2 text-[#999]">›</span>
                    </>
                ) : (
                    <span className="font-[400] text-[16px] leading-[100%] tracking-[0] text-black font-[Satoshi]">
                        {label}
                    </span>
                )}
            </span>
        );
    });

    return (
        <nav className="flex items-center pt-[10px] pb-[10px]">
            <Link
                href="/"
                className="text-[#666] hover:underline font-[400] text-[16px] leading-[100%] tracking-[0] font-[Satoshi]"
            >
                Home
            </Link>
            {pathParts.length > 0 && <span className="mx-2 text-[#999]">›</span>}
            {crumbs}
        </nav>
    );
}
