import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalNav from "./GlobalNav";
import styles from "./LayoutStyle.module.css";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <article className={styles.header}>
        <header>
          <h1>WELCOME TO PROJECT CRUD</h1>
        </header>
      </article>
      <section className={styles.contentSection}>
        <GlobalNav />
        <Outlet />
      </section>
      <ToastContainer />
    </>
  );
};
export default Layout;
