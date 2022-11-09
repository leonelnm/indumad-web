import FullCalendar from "@fullcalendar/react" // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid" // a plugin!
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!

export const CalendarView = ({ list = [] }) => {
  // const handleClickEvent = (info) => {
  //   info.jsEvent.preventDefault()
  //   console.log(info.event)
  //   console.log(info.event.title)
  //   console.log(info.event.start)
  //   console.log(info.event.end)
  // }

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
      // eventClick={handleClickEvent}
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
