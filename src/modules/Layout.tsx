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
        <div>This is section</div>
      </section>
    </>
  );
};
export default Layout;
