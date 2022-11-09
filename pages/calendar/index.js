import dayjs from "dayjs"
import { indumadRoutes } from "api"
import { CalendarView } from "components/calendar/CalendarView"
import { MainLayout } from "components/layouts/MainLayout"
import { DotFlash } from "components/loaders/DotFlash"
import { useFetchSwr } from "hooks/useFetchSwr"

const getEndDate = (startDate, duration) => {
  const unitToAdd = duration > 1 ? "h" : "m"

  return dayjs(new Date(startDate))
    .add(duration, unitToAdd)
    .format("YYYY-MM-DD HH:ss")
}

const getStartDate = (startDate) => {
  return dayjs(new Date(startDate)).format("YYYY-MM-DD HH:ss")
}

export default function CalendarPage(params) {
  const { isLoading, data, error } = useFetchSwr({
    path: indumadRoutes.schedule.path,
  })

  return (
    <MainLayout title="Agenda">
      {isLoading && <DotFlash />}
      {error && <p>Error</p>}
      {!isLoading && !error && (
        <CalendarView
          list={data.map((item) => ({
            title: item.description,
            date: getStartDate(item.dateTime),
            end: getEndDate(item.dateTime, item.duration),
          }))}
        />
      )}
    </MainLayout>
  )
}
