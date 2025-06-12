import Header from '../../components/Layouts/Header/Header'  
import Footer from '../../components/Layouts/Footer/Footer'
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs'
import styles from './layout.module.scss'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Header />           {/* hiển thị mọi nơi trong nhóm (main) */}
      <Breadcrumbs />      {/* breadcrumb động dựa trên URL */}
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
