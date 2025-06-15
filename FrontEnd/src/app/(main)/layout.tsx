'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../../components/Layouts/Header/Header';
import Footer from '../../components/Layouts/Footer/Footer';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Loader from '../../components/Loader/loader';
import styles from './layout.module.scss';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/homepage";
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setSpinning(true);
    const timeout = setTimeout(() => setSpinning(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className={styles.wrapper}>
      <Header />
      {isHomePage ? (
        children
      ) : (
        <main className={styles.main}>
          <Breadcrumbs />
          {children}
        </main>
      )}
      <Loader spinning={spinning} fullScreen={true} />
      <Footer />
    </div>
  );
}