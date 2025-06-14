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
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setSpinning(true);
    const timeout = setTimeout(() => setSpinning(false), 500); // mô phỏng loading 500ms khi đổi route
    return () => clearTimeout(timeout);
  }, [pathname]); // mỗi khi đổi URL sẽ chạy useEffect

  return (
    <div className={styles.wrapper}>
      <Header />
      <section className="mt-[120px] px-[100px]">
        <Breadcrumbs />
      </section>
      <Loader spinning={spinning} fullScreen={true} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
