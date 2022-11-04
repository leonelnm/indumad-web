import styles from "./dotflash.module.scss"

export const DotFlash = ({ absolute = false }) => {
  return (
    <div
      className={
        styles[`${absolute ? "container-absolute" : "container-loader"}`]
      }
    >
      <div className={styles["dot-flashing"]} />
    </div>
  )
}
