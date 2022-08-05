import styles from "./dotflash.module.scss"

export const DotFlash = () => {
  return (
    <div className={styles["container-loader"]}>
      <div className={styles["dot-flashing"]} />
    </div>
  )
}
