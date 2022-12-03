import dayjs from "dayjs"
import { useState } from "react"
import { indumadRoutes } from "api"
import { CalendarView } from "components/calendar/CalendarView"
import { MainLayout } from "components/layouts/MainLayout"
import { DotFlash } from "components/loaders/DotFlash"
import { useFetchSwr } from "hooks/useFetchSwr"
import EventModal from "components/calendar/EventModal"

const getEndDate = (startDate, duration) => {
  const unitToAdd = "h"

  return dayjs(new Date(startDate))
    .add(duration, unitToAdd)
    .format("YYYY-MM-DD HH:mm")
}

const getStartDate = (startDate) => {
  return dayjs(new Date(startDate)).format("YYYY-MM-DD HH:mm")
}

export default function CalendarPage() {
  const { isLoading, data, error } = useFetchSwr({
    path: indumadRoutes.schedule.path,
  })

  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState({
    title: "",
    date: "",
    end: "",
  })

  return (
    <MainLayout title="Agenda">
      {isLoading && <DotFlash />}
      {error && <p>Error</p>}

      <EventModal event={event} open={open} setOpen={setOpen} />

      {!isLoading && !error && (
        <CalendarView
          setEvent={setEvent}
          setOpen={setOpen}
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
