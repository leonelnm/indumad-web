import styles from "./loader.module.scss"

export const Loader = () => {
  return (
    <div className={styles["container-loader"]}>
      <span className={styles.loader}></span>
      <span>Cargando...</span>
    </div>
  )
}
