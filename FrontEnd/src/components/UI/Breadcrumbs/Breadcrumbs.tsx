'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Breadcrumbs.module.scss'

export default function Breadcrumbs() {
    const pathname = usePathname()
    const pathParts = pathname.split('/').filter(Boolean)

    const crumbs = pathParts.map((part, index) => {
        const href = '/' + pathParts.slice(0, index + 1).join('/')
        const label = decodeURIComponent(part.charAt(0).toUpperCase() + part.slice(1))
        const isLast = index === pathParts.length - 1

        return (
            <span key={href} className={styles.breadcrumbItem}>
                {!isLast ? (
                    <>
                        <Link href={href} className={styles.breadcrumbLink}>{label}</Link>
                        <span className={styles.breadcrumbSeparator}>›</span>
                    </>
                ) : (
                    <span className={styles.breadcrumbCurrent}>{label}</span>
                )}
            </span>
        )
    })

    return (
        <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            {pathParts.length > 0 && <span className={styles.breadcrumbSeparator}>›</span>}
            {crumbs}
        </nav>
    )
}
