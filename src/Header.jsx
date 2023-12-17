import { icons } from './weather'

function Header(props) {
	// Set header icon to reflect if it's currently day or night time.	
	const meridian_local 	= (props.localTime).substring(props.localTime.length-2, props.localTime.length);
	const idx_local_colon 	= props.localTime.indexOf(':');
	const idx_sunset_colon 	= props.sunset.indexOf(':');
	let localHour 			= Number(props.localTime.substring(0, idx_local_colon));
	const localMin 	 		= Number(props.localTime.substring(idx_local_colon + 1, idx_local_colon + 3));
	const sunsetHour 		= Number(props.sunset.substring(0, idx_sunset_colon)) + 12;
	const sunsetMin  		= Number(props.sunset.substring(idx_sunset_colon + 1, idx_sunset_colon + 3));

	if(meridian_local == 'PM' && localHour != 12) {
		localHour += 12;
	}
	
	// Reset icons to day time icons
	icons[0] = './icons/day.svg';
	icons[1] = './icons/cloudy-day-2.svg';
	icons[2] = './icons/cloudy-day-2.svg';
	icons[3] = './icons/cloudy.svg';
	icons[45] = './icons/fog.svg';

	// Check if local time is past sunset time
	if(localHour >= sunsetHour) {
		if((localHour > sunsetHour) || (localMin >= sunsetMin)) {
			icons[0] = './icons/night.svg';
			icons[1] = './icons/cloudy-night-2.svg';
			icons[2] = './icons/cloudy-night-2.svg';
			icons[3] = './icons/cloudy-night-2.svg';
			icons[45] = './icons/fog-night.svg';
		}
	}

	return (
		<header className='header'>
			<div className='header-left'>
				<img className='weather-icon large' src={ icons[props.iconCode] }/>
				<div className='header-current-temp'>
					<span>{ props.currenttemp }</span>&deg;
				</div>
				<p id="location-city">📍 { props.location }</p>
				<div id="local-time">🕑 { props.localTime }</div>
			</div>

			<div className='header-right'>
				<div className='info-group'>
					<div className='label'>High</div>
					<div><span>{ props.currenthigh }</span>&deg;</div>
				</div>
				<div className='info-group'>
					<div className='label'>Wind</div>
					<div>
						<span>{ props.currentwind }</span>
						<span className='value-sub-info'> km/h</span>
					</div>
				</div>
				<div className='info-group'>
					<div className='label'>UV Index</div>
					<div><span>{ props.uv }</span></div>
				</div>
				<div className='info-group'>
					<div className='label'>Low</div>
					<div><span>{ props.currentlow }</span>&deg;</div>
				</div>
				<div className='info-group'>
					<div className='label'>Precip</div>
					<div>
						<span>{ props.currentprecip }</span>
						<span className='value-sub-info'> mm</span>
					</div>
				</div>
				<div className='info-group'>
					<div className='label'>Sunset</div>
					<div>
						<span>{ props.sunset }</span>
						<span className='value-sub-info'><br></br>(local time)</span>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header