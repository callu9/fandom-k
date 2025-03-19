import { useEffect, useState } from "react";

export default function DeadlineSelector({ onChange }) {
	const [date, setDate] = useState("2025-00-00");
	const [time, setTime] = useState("00:00:00");

	function handleDateChange(e) {
		const newDate = e.target.value;
		setDate(newDate);
		handleSetDeadline(newDate, time);
	}
	function handleTimeChange(e) {
		const newTime = e.target.value;
		setTime(newTime);
		handleSetDeadline(date, newTime);
	}
	function handleSetDeadline(date, time) {
		onChange(`${date}T${time}:00.000Z`);
	}
	return (
		<div className="input-wrapper">
			<label htmlFor="deadline">후원 마감일</label>
			<div className="display-flex align-center gap-16">
				<input type="date" id="deadline" value={date} onChange={handleDateChange} />
				<input type="time" value={time} onChange={handleTimeChange} />
			</div>
		</div>
	);
}
