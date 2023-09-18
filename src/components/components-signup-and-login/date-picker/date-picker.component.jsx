import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
// import DatePicker from 'react-mobile-datepicker';
import './date-picker.styles.css';

class BirthdayPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
        };
    }

    handleDateChange = (date) => {
            this.setState({
                selectedDate: date,
            });
    };

    render() {
        return (
            <div>
                <h1>Select Your Birthday</h1>

                <DatePicker // selected={this.state.selectedDate}
                            // onChange={this.handleDateChange}
                            controls={['date']}
                            display="inline"
                            touchUi={true}
                            // showYearDropdown // 显示年份下拉菜单
                            scrollableYearDropdown // 允许滚动选择年份
                            yearDropdownItemNumber={100} // 设置足够大的值，以包含所有需要的年份
                            minDate={new Date('1940-01-01')} // 设置最小日期为 1980 年 1 月 1 日
                            maxDate={new Date('2020-12-31')} // 设置最大日期为 1985 年 12 月 31 日 
                />

                <p>Selected Date: {this.state.selectedDate ? this.state.selectedDate.toDateString() : 'Please select a date'}</p>
            </div>
        );
    }
}

export default BirthdayPicker;