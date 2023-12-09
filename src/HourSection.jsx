import { icons } from './weather'
import { daysOfWeek } from './DaySection';
// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function HourSection(props) {
	const HOURS_MAX = 48;
	const HOURS_MIN = props.hourly.length < HOURS_MAX ? props.hourly.length : HOURS_MAX;
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
		// console.log("date", date)
		// console.log("DAY", date)
		// console.log("PROPS LEN", props.hourly.length)

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

	// props.hourly.forEach((hour, idx) => {
	// 	hours.push(
	// 		<tr key={ idx } className="hour-row">
	// 			<td>
	// 				<div className="info-group">
	// 					<div className="label">{ daysOfWeek[hour.timestamp.getDay()] }</div>
	// 					<div>{ hour.timestamp.getHours() }</div>
	// 				</div>
	// 			</td>
	// 			<td>
	// 				<img src={ icons[hour.iconCode] } className="weather-icon medium"></img>
	// 			</td>
	// 			<td>
	// 				<div className="info-group">
	// 					<div className="label">Temp</div>
	// 					<div>{ hour.temp }&deg;</div>
	// 				</div>
	// 			</td>
	// 			<td>
	// 				<div className="info-group">
	// 					<div className="label">Precip</div>
	// 					<div>{ hour.precip } <span className="value-sub-info">mm</span></div>
	// 				</div>
	// 			</td>
	// 			<td>
	// 				<div className="info-group">
	// 					<div className="label">Wind</div>
	// 					<div>{ hour.windSpeed } <span className="value-sub-info">km/h</span></div>
	// 				</div>
	// 			</td>
	// 		</tr>
	// 	);
	// });

	return(
		<table className="hour-section">
			<tbody datahoursection="true">
				{ hours }
				{/* <tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>3pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>4pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>5pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>6pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>7pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>8pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>9pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>10pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Friday</div>
							<div>11pm</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Saturday</div>
							<div>12am</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Saturday</div>
							<div>1am</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Saturday</div>
							<div>2am</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Saturday</div>
							<div>3am</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Saturday</div>
							<div>4am</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Saturday</div>
							<div>5am</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr>
				<tr className="hour-row">
					<td>
						<div className="info-group">
							<div className="label">Saturday</div>
							<div>6am</div>
						</div>
					</td>
					<td>
						<div className="weather-icon medium">☁</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Temp</div>
							<div>15&deg;</div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Precip</div>
							<div>15<span className="value-sub-info">mm</span></div>
						</div>
					</td>
					<td>
						<div className="info-group">
							<div className="label">Wind</div>
							<div>10<span className="value-sub-info">km/h</span></div>
						</div>
					</td>
				</tr> */}
			</tbody>
		</table>
	)
}

export default HourSection