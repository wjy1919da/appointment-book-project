import React from "react";
import dateFns from "date-fns";
import {isBefore } from 'date-fns';
import { format, parse, addDays } from 'date-fns';
import './calendar.styles.scss';
import { startOfWeek, startOfMonth, endOfMonth, endOfWeek,isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        dropdownVisible: 'none'  // Add this line
    };
    toggleMonthDropdown = () => {
        this.setState(prevState => ({
            dropdownVisible: prevState.dropdownVisible === 'month' ? 'none' : 'month'
        }));
    }
    
    toggleYearDropdown = () => {
        this.setState(prevState => ({
            dropdownVisible: prevState.dropdownVisible === 'year' ? 'none' : 'year'
        }));
    }

    renderHeader() {
        const { currentMonth } = this.state;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentYear = currentMonth.getFullYear();
        const startYear = currentYear - 10;
        const endYear = currentYear + 10;
        const years = Array.from({ length: 21 }, (_, index) => startYear + index);
        
        return (
            <div className="header row flex-middle">
            <div className="dropdown-container">  {/* Add this wrapper */}
              <div className="dropdown" onClick={this.toggleMonthDropdown}>
                  <span>{monthNames[currentMonth.getMonth()]}</span>
                  {this.state.dropdownVisible === 'month' && (
                      <div className="dropdown-content">
                          {monthNames.map((month, index) => (
                              <div key={index} onClick={() => this.selectMonth(index)}>{month}</div>
                          ))}
                      </div>
                  )}
              </div>
              <div className="dropdown" onClick={this.toggleYearDropdown}>
                  <span>{currentYear}</span>
                  {this.state.dropdownVisible === 'year' && (
                      <div className="dropdown-content">
                          {years.map(year => (
                              <div key={year} onClick={() => this.selectYear(year)}>{year}</div>
                          ))}
                      </div>
                  )}
              </div>
            </div>
          </div>
        );
    }
    
    selectMonth = (monthIndex) => {
        const newDate = new Date(this.state.currentMonth.setMonth(monthIndex));
        this.setState({ currentMonth: newDate });
    }
    
    selectYear = (year) => {
        const newDate = new Date(this.state.currentMonth.setFullYear(year));
        this.setState({ currentMonth: newDate });
    }

    renderDays() {
        const daysShortNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        return (
            <div className="days row">
                {daysShortNames.map((day, index) => (
                    <div className="col col-center" key={index}>
                        {day}
                    </div>
                ))}
            </div>
        );
    }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "dd"; 
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate)
                            ? "selected"
                            : isBefore(day, new Date())
                            ? "past"
                            : ""
                    }`}
                    key={day}
                    onClick={() => this.onDateClick(cloneDay)}
                >
                <span className="number">{formattedDate}</span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    // Only allow clicking on dates in the current month and that are not in the past
    if (isSameMonth(day, this.state.currentMonth) && !isBefore(day, new Date())) {
        this.setState({
            selectedDate: day
        });
    }
};

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;