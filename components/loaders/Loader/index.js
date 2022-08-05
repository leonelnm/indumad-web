import { Box } from "@mui/material"
import styles from "./loader.module.css"

export const Loader = () => {
  return (
    <Box className={styles["container-loader"]}>
      <span className={styles.loader}></span>
      <span>Cargando...</span>
    </Box>
  )
}
