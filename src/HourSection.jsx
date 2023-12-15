import { icons } from './weather'
import { daysOfWeek } from './DaySection';

function HourSection(props) {
	// const HOURS_MAX = 48;
	const HOURS_MIN = props.hourly.length;
	const hours = [];

	console.log("Props: ", 
				props.hourly[0].timestamp, 
				props.hourly[0].iconCode, 
				props.hourly[0].temp, 
				props.hourly[0].precip, 
				props.hourly[0].windSpeed
	);

	for(let i = 0; i < HOURS_MIN; i++) {
		const dateHour = new Intl.DateTimeFormat('en-US', { hour: "numeric" }).format(props.hourly[i].timestamp);

		hours.push(
			<tr key={ i } className="hour-row">
				<td>
					<div className="info-group">
						<div className="label">{ daysOfWeek[props.hourly[i].timestamp.getDay()] }</div>
						<div>{ dateHour }</div>
					</div>
				</td>
				<td>
					<img src={ icons[props.hourly[i].iconCode] } className="weather-icon medium"></img>
				</td>
				<td>
					<div className="info-group">
						<div className="label">Temp</div>
						<div>{ props.hourly[i].temp }&deg;</div>
					</div>
				</td>
				<td>
					<div className="info-group">
						<div className="label">Precip</div>
						<div>{ props.hourly[i].precip }<span className="value-sub-info"> mm</span></div>
					</div>
				</td>
				<td>
					<div className="info-group">
						<div className="label">Wind</div>
						<div>{ props.hourly[i].windSpeed }<span className="value-sub-info"> km/h</span></div>
					</div>
				</td>
			</tr>
		);
	}

	return(
		<table className="hour-section">
			<tbody datahoursection="true">
				{ hours }
			</tbody>
		</table>
	)
}

export default HourSection