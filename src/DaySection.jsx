import { icons } from './weather'

function DaySection(props) {
	const data = props.days;
	const dayCards = [];
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let dayName = "";
	let bgColor = {};

	// Resetting icons, they are changed in Header component it is night time
	icons[0] = 'src/icons/day.svg';
	icons[1] = 'src/icons/cloudy-day-2.svg';
	icons[2] = 'src/icons/cloudy-day-2.svg';
	icons[3] = 'src/icons/cloudy.svg';
	icons[45] = 'src/icons/fog.svg';

	props.days.forEach((day, idx) => {
		if(idx == 0) {
			dayName = "Yesterday";
			bgColor = { backgroundColor: "hsl(200, 100%, 92.5%)" };
		} else if(idx == 1) {
			dayName = "Today"
			bgColor = { backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(200, 100%, 10%)"};
		} else {
			dayName = daysOfWeek[day.timestamp];
			bgColor = { backgroundColor: "hsl(200, 100%, 92.5%)" };
		}

		dayCards.push(
			<div key={ idx } className="day-card" style={ bgColor }>
				<div className="day-card-day">{ dayName }</div>
				<img className="weather-icon medium" src={ icons[day.iconCode] } />
				<div>{ day.maxTemp }&deg;</div>
			</div>
		);
	});

	return (
		<section className="day-section">
			{ dayCards }
			{/* <div className="day-card">
				<img className="weather-icon medium" src='src/icons/cloudy.svg' />
				<div className="day-card-day">Monday</div>
				<div>15&deg;</div>
			</div>
			<div className="day-card">
				<img className="weather-icon medium" src='src/icons/cloudy.svg' />
				<div className="day-card-day">Tuesday</div>
				<div>15&deg;</div>
			</div>
			<div className="day-card">
				<img className="weather-icon medium" src='src/icons/cloudy.svg' />
				<div className="day-card-day">Wednesday</div>
				<div>15&deg;</div>
			</div>
			<div className="day-card">
				<img className="weather-icon medium" src='src/icons/cloudy.svg' />
				<div className="day-card-day">Thursday</div>
				<div>15&deg;</div>
			</div>
			<div className="day-card">
				<img className="weather-icon medium" src='src/icons/cloudy.svg' />
				<div className="day-card-day">Friday</div>
				<div>15&deg;</div>
			</div>
			<div className="day-card">
				<img className="weather-icon medium" src='src/icons/cloudy.svg' />
				<div className="day-card-day">Saturday</div>
				<div>15&deg;</div>
			</div>
			<div className="day-card">
				<img className="weather-icon medium" src='src/icons/cloudy.svg' />
				<div className="day-card-day">Sunday</div>
				<div>15&deg;</div>
			</div> */}
		</section>

		// <template></template>
	)
}

export default DaySection