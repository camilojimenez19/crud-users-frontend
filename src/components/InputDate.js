import React from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const InputDate = ({ date, className, onChange }) => {
    return (
        <DatePicker
            className={className}
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            onChange={onChange}
            selected={date}
            dateFormat="yyyy-MM-dd"
        />
    )
}
