import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerEnd = (props: any) => {
  const { date_end, setdate_end } = props;
  const [startDate, setStartDate] = useState(new Date(date_end));

  const dateUpdateHadle = (date: Date) => {
    setStartDate(date)
    setdate_end(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`)

  }

  return (
    <DatePicker selected={startDate} onChange={(date: Date) => dateUpdateHadle(date)} />

  );
};


const DatePickerStart = (props: any) => {
  const { date_start, setdate_start } = props;
  const [startDate, setStartDate] = useState(new Date(date_start));

  const dateUpdateHadle = (date: Date) => {
    setStartDate(date);
    setdate_start(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
    );
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => dateUpdateHadle(date)}
      />
    </div>
  );
};

export { DatePickerEnd, DatePickerStart }; 