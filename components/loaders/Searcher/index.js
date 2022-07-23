import styles from "./searcher.module.scss"

export const Searcher = () => {
  return (
    <div className={styles["container-loader"]}>
      <span className={styles.loader}></span>
      <span>Buscando...</span>
    </div>
  )
}
