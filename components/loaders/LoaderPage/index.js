import styles from "./loaderpage.module.scss"

export const LoaderPage = () => {
  return (
    <div className={styles["container-loader"]}>
      <div className={styles.loader}></div>
    </div>
  )
}
