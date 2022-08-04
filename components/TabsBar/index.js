import { Box } from "@mui/material"
import { TabMenu } from "components/ui"
import { useRouter } from "next/router"

export const TabsBar = ({ list = [] }) => {
  const router = useRouter()
  const { tab } = router.query

  // validate tabs
  if (tab) {
    const tabs = list.map((item) => (item.query ? item.query : ""))
    !tabs.includes(tab) && router.push("/404")
  }

  const getElementByQuery = () => {
    const founded = list.find((item) => item.query === tab)
    return founded || list[0]
  }

  const componentToDraw = getElementByQuery().component

  return (
    <>
      <TabMenu list={list} />
      <Box component="section" sx={{ pt: "1rem", pb: "1rem" }}>
        {componentToDraw}
      </Box>
    </>
  )
}
