import React, { useState } from "react";

interface DateRangePickerProps {
  lowerLimit: Date;
  upperLimit: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  lowerLimit,
  upperLimit,
}) => {
  const [startDate, setStartDate] = useState(lowerLimit);
  const [endDate, setEndDate] = useState(upperLimit);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  return (
    <div>
      <label style={{ fontWeight: "bold", margin: "5px" }}>Start Date:</label>
      <input
        type="date"
        value={startDate.toISOString().split("T")[0]}
        onChange={(e) => handleStartDateChange(new Date(e.target.value))}
        style={{ marginRight: "20px" }}
      />

      <label style={{ fontWeight: "bold", margin: "5px" }}>End Date:</label>
      <input
        type="date"
        value={endDate.toISOString().split("T")[0]}
        onChange={(e) => handleEndDateChange(new Date(e.target.value))}
      />
    </div>
  );
};

export default DateRangePicker;
