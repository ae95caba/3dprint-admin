import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function TimeStamp() {
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    // Get the current date and format it as day/month/year
    const currentDate = new Date();
    const formattedDateStr = format(currentDate, "dd/MM/yyyy");

    // Set the formatted date to the state
    setFormattedDate(formattedDateStr);
  }, []);

  return (
    <div className="timestamp">
      <p>{formattedDate}</p>
    </div>
  );
}
