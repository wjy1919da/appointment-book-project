import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.scss'

const CalendarComponent = () => {
  function isToday(date) {
    return new Date().toDateString() === date.toDateString();
  }

  const [date, setDate] = useState(new Date()); // react-calendar date

  const handleChangeDate = (newDate) => {
    setDate(newDate);
  };

  const tileClassName = ({ date }) => {
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();

    return isToday ? 'today-tile' : '';
  };

  // change the week day format to two letters
  const formatShortWeekday = (locale, date) => {
    // date = new Date();
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return weekdays[date.getDay()];
  };

  return (
    <>
      <Calendar
        onChange={handleChangeDate}
        value={date}
        locale='en-GB'
        formatShortWeekday={formatShortWeekday}
        tileClassName={tileClassName}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            if (isToday(date)) {
              return <div className='is-today'></div>;
            }
          }
        }}
      />
    </>
  );
};

export default CalendarComponent;
