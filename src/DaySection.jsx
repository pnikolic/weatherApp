import { icons } from './weather'
export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DaySection(props) {
	const todayDate = new Date();
	const today = todayDate.getDay();
	const dayCards = [];
	let dayName = "";
	let bgColor = {};

	// Resetting icons, they were changed in Header component it is night time
	icons[0] = '/icons/day.svg';
	icons[1] = '/icons/cloudy-day-2.svg';
	icons[2] = '/icons/cloudy-day-2.svg';
	icons[3] = '/icons/cloudy.svg';
	icons[45] = '/icons/fog.svg';

	props.days.forEach((day, idx) => {
		dayName = daysOfWeek[day.timestamp];

		if(day.timestamp == today) {
			console.log("today is:", daysOfWeek[today])
			bgColor = { backgroundColor: "hsl(0, 0%, 100%)", border: "2px solid hsl(200, 100%, 10%)" };
		} else {
			bgColor = { backgroundColor: "hsl(200, 100%, 92.5%)" };
		}

		dayCards.push(
			<div key={ idx } className="day-card" style={ bgColor }>
				<div className="day-card-day">{ dayName }</div>
				<img className="weather-icon medium" src={ icons[day.iconCode] } />
				<div className='day-temp'>{ day.maxTemp }&deg;</div>
			</div>
		);
	});

	return (
		<section className="day-section">
			{ dayCards }
			
		</section>
	)
}

export default DaySection