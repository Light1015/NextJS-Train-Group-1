'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(Boolean);

    const [productName, setProductName] = useState('');
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const isProductDetail = pathParts[0] === 'product' && pathParts[1];

        if (isProductDetail) {
            const productId = pathParts[1];

            // 👉 Đổi link API cho phù hợp môi trường thực tế
            const apiUrl = `https://your-api-domain.com/product/products/${productId}/`;

            fetch(apiUrl)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    setProductName(data.name || '');
                    setCategoryName(data.category?.name || 'Category');
                })
                .catch((err) => {
                    console.error('❌ Failed to load product for breadcrumbs', err);
                });
        }
    }, [pathname]);

    const isProductPage = pathParts[0] === 'product' && productName;

    return (
        <nav className="flex items-center pt-[10px] pb-[10px]">
            <Link href="/" className="text-[#666] hover:underline font-[Satoshi] text-[16px]">
                Home
            </Link>
            <span className="mx-2 text-[#999]">›</span>

            {isProductPage ? (
                <>
                    <Link
                        href={`/category/${categoryName.toLowerCase()}`}
                        className="text-[#666] hover:underline text-[16px] font-[Satoshi]"
                    >
                        {categoryName}
                    </Link>
                    <span className="mx-2 text-[#999]">›</span>
                    <span className="text-black font-[Satoshi] text-[16px]">{productName}</span>
                </>
            ) : (
                pathParts.map((part, index) => {
                    const href = '/' + pathParts.slice(0, index + 1).join('/');
                    const label = decodeURIComponent(part)
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                    const isLast = index === pathParts.length - 1;

                    return (
                        <span key={href} className="flex items-center">
                            {!isLast ? (
                                <>
                                    <Link
                                        href={href}
                                        className="text-[#666] hover:underline text-[16px] font-[Satoshi]"
                                    >
                                        {label}
                                    </Link>
                                    <span className="mx-2 text-[#999]">›</span>
                                </>
                            ) : (
                                <span className="text-black font-[Satoshi] text-[16px]">{label}</span>
                            )}
                        </span>
                    );
                })
            )}
        </nav>
    );
}
