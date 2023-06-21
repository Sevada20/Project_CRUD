import { Outlet } from "react-router-dom";
import GlobalNav from "./GlobalNav";
import styles from "./LayoutStyle.module.css";

const Layout = () => {
  return (
    <>
      <article className={styles.header}>
        <header>
          <h1>Welcome</h1>
        </header>
      </article>
      <section className={styles.contentSection}>
        <GlobalNav />
        <Outlet />
      </section>
    </>
  );
};
export default Layout;
