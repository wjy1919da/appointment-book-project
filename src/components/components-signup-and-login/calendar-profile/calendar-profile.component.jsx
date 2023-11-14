// // import '../../user-appointment/calendar.styles.scss';
// import './calendar-profile.styles.scss';
// import React from "react";
// import dateFns from "date-fns";
// import {isBefore } from 'date-fns';
// import { format, parse, addDays } from 'date-fns';
// import { startOfWeek, startOfMonth, endOfMonth, endOfWeek,isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
// class CalendarProfile extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentMonth: new Date(),
//             selectedDate: new Date(),
//             dropdownVisible: 'none',
//             calendarVisible: false
//         }
//         this.calendarRef = React.createRef();
//     }
//     toggleMonthDropdown = () => {
//         this.setState(prevState => ({
//             dropdownVisible: prevState.dropdownVisible === 'month' ? 'none' : 'month'
//         }));
//     }
//     toggleYearDropdown = () => {
//         this.setState(prevState => ({
//             dropdownVisible: prevState.dropdownVisible === 'year' ? 'none' : 'year'
//         }));
//     }
//     toggleCalendarVisibility = () => {
//         this.setState(prevState => ({
//             calendarVisible: !prevState.calendarVisible
//         }));
//     }
//     componentDidMount() {
//         document.addEventListener('mousedown', this.handleOutsideClick);
//     }
    
//     componentWillUnmount() {
//         document.removeEventListener('mousedown', this.handleOutsideClick);
//     }    
//     handleOutsideClick = (event) => {
//         if (this.calendarRef.current && !this.calendarRef.current.contains(event.target)) {
//             this.setState({ calendarVisible: false });
//         }
//     }
//     renderHeader() {
//         return (
//             <div>
//                 <input 
//                     type="text" 
//                     placeholder='birthday'
//                     onFocus={this.toggleCalendarVisibility}
//                 />
//                 {this.state.calendarVisible && (
//                     <div style={{'position':'absolute','backgroundColor':'white','marginLeft':'-50px','width':'400px'}} ref={this.calendarRef}>
//                         {this.renderPickers()}
//                         {this.renderDays()}
//                         {this.renderCells()}
//                     </div>
//                 )}
//             </div>  
//         );
//     }
//     renderPickers() {
//         const { currentMonth } = this.state;
//         const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//         const currentYear = currentMonth.getFullYear();
//         const startYear = currentYear - 10;
//         const endYear = currentYear + 10;
//         const years = Array.from({ length: 21 }, (_, index) => startYear + index);
//         return(
//             <div className="picker-header">
//                 <button className='picker-switcher' onClick={this.prevMonth}>{"<"}</button>
//                 <div className="slide-container">
//                     {monthNames.map((month, index) => (
//                         <div key={index} className={currentMonth.getMonth() === index ? "active" : ""} onClick={() => this.selectMonth(index)}>
//                             {month}
//                         </div>
//                     ))}
//                     {years.map(year => (
//                         <div key={year} className={year === currentYear ? "active" : ""} onClick={() => this.selectYear(year)}>
//                             {year}
//                         </div>
//                     ))}
//                 </div>
//                 <button className='picker-switcher' onClick={this.nextMonth}>{">"}</button>
//             </div>
//         )
//     }
    
//     selectMonth = (monthIndex) => {
//         const newDate = new Date(this.state.currentMonth.setMonth(monthIndex));
//         this.setState({ currentMonth: newDate });
//     }
    
//     selectYear = (year) => {
//         const newDate = new Date(this.state.currentMonth.setFullYear(year));
//         this.setState({ currentMonth: newDate });
//     }

//     renderDays() {
//         const daysShortNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
//         return (
//             <div className="days row">
//                 {daysShortNames.map((day, index) => (
//                     <div className="col col-center" key={index}>
//                         {day}
//                     </div>
//                 ))}
//             </div>
//         );
//     }


//   renderCells() {
//     const { currentMonth, selectedDate } = this.state;
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const dateFormat = "dd"; 
//     const rows = [];

//     let days = [];
//     let day = startDate;
//     let formattedDate = "";

//     while (day <= endDate) {
//         for (let i = 0; i < 7; i++) {
//             formattedDate = format(day, dateFormat);
//             const cloneDay = day;
//             days.push(
//                 <div
//                     className={`col cell ${
//                         !isSameMonth(day, monthStart)
//                             ? "disabled"
//                             : isSameDay(day, selectedDate)
//                             ? "selected"
//                             : isBefore(day, new Date())
//                             ? "past"
//                             : ""
//                     }`}
//                     key={day}
//                     onClick={() => this.onDateClick(cloneDay)}
//                 >
//                 <span className="number">{formattedDate}</span>
//                 </div>
//             );
//             day = addDays(day, 1);
//         }
//         rows.push(
//             <div className="row" key={day}>
//                 {days}
//             </div>
//         );
//         days = [];
//     }
//     return <div className="body">{rows}</div>;
//   }

//   onDateClick = day => {
//     // Only allow clicking on dates in the current month and that are not in the past
//     if (isSameMonth(day, this.state.currentMonth) && !isBefore(day, new Date())) {
//         this.setState({
//             selectedDate: day
//         });
//     }
// };

//   nextMonth = () => {
//     this.setState({
//       currentMonth: addMonths(this.state.currentMonth, 1)
//     });
//   };

//   prevMonth = () => {
//     this.setState({
//       currentMonth: subMonths(this.state.currentMonth, 1)
//     });
//   };

//   render() {
//     return (
//       <div className="calendar">
//         {this.renderHeader()}
//       </div>
//     );
//   }
// }
// export default CalendarProfile;