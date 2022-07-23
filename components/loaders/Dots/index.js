import styles from "./dots.module.scss"

export const Dots = () => {
  return (
    <div className={styles["container-loader"]}>
      <div className={styles.load}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <span>Cargando...</span>
    </div>
  )
}
