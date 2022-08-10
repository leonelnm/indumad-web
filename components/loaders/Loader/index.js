import styles from "./loader.module.css"

export const Loader = () => {
  return (
    <div className={styles["container-loader"]}>
      <span className={styles.loader}></span>
    </div>
  )
}
