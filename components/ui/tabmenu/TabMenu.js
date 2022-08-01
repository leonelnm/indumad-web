import Box from "@mui/material/Box"
import { Tab } from "./Tab"

export const TabMenu = ({ list = [] }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: { xs: "flex" },
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
    </Box>
  )
}
