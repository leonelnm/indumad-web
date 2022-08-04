import Box from "@mui/material/Box"
import { Tab } from "./Tab"

export const TabMenu = ({ list = [] }) => {
  return (
    <Box
      component="nav"
      role="navigation"
      aria-labelledby="tabs-navigation"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: { xs: "flex" },
        width: "100%",
      }}
    >
      {list.map((menu) => (
        <Tab
          key={menu.text}
          path={menu.path}
          text={menu.text}
          query={menu.query}
          default={menu.default}
        />
      ))}
    </Box>
  )
}
