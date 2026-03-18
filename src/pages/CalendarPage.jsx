import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DnDPlugin from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useState, useRef } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./CalendarPage.css";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Handle both default and named export depending on the version
const withDragAndDrop = DnDPlugin.default ?? DnDPlugin;
const DnDCalendar = withDragAndDrop(Calendar);

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const draggedTaskRef = useRef(null);
  const eventIdRef = useRef(0);

  const tasks = [
    { id: 1, title: "Design UI" },
    { id: 2, title: "Workout" },
    { id: 3, title: "Study React" },
    { id: 4, title: "Read book" },
  ];

  const onEventDrop = ({ event, start, end }) => {
    setEvents((prev) =>
      prev.map((e) => (e === event ? { ...e, start, end } : e)),
    );
  };

  const onDropFromOutside = ({ start, end }) => {
    if (!draggedTaskRef.current) return;
    const task = draggedTaskRef.current;
    eventIdRef.current += 1;
    const newEvent = {
      id: eventIdRef.current,
      title: task.title,
      start,
      end: end || new Date(start.getTime() + 60 * 60 * 1000),
    };
    setEvents((prev) => [...prev, newEvent]);
    draggedTaskRef.current = null;
  };

  return (
    <div className="calendar-page">
      <div className="task-panel">
        <h2>Tasks</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => {
              draggedTaskRef.current = task;
            }}
            className="task-card"
          >
            {task.title}
          </div>
        ))}
      </div>

      <div className="calendar-panel">
        <DnDCalendar
          localizer={localizer}
          events={events}
          selectable
          resizable
          style={{ height: 600 }}
          onEventDrop={onEventDrop}
          onDropFromOutside={onDropFromOutside}
          dragFromOutsideItem={() => draggedTaskRef.current}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
