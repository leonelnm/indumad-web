import FullCalendar from "@fullcalendar/react" // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid" // a plugin!
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!
import { dateGMTToShowLong } from "utils/date"

export const CalendarView = ({ list = [], setOpen, setEvent }) => {
  const handleClickEvent = (info) => {
    const { end } = info.event?._instance.range

    setEvent({
      title: info.event.title,
      date: dateGMTToShowLong(info.event.start),
      end: dateGMTToShowLong(end),
    })
    setOpen(true)
  }

  return (
    <FullCalendar
      viewClassNames="calendarBackground"
      allDaySlot={true}
      allDayText=""
      buttonText={{
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
      }}
      dayHeaderClassNames="calendardayheader"
      dayHeaderFormat={{ weekday: "narrow", day: "numeric" }}
      events={list}
      eventClick={handleClickEvent}
      firstDay={1}
      height={"85vh"}
      initialView="timeGridWeek"
      locale="es"
      plugins={[timeGridPlugin, dayGridPlugin]}
      slotLabelFormat={{
        hour: "numeric",
        minute: "2-digit",
      }}
      slotLabelClassNames="calendarslodlabel"
      timeZone="UTC"
      // timeZoneName="long"
      titleFormat={{ year: "numeric", month: "short" }}
      weekNumberFormat={{ week: "short" }}
    />
  )
}
