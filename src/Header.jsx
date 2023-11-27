function Header(props) {
	/*
		Code		| Description
	---------------------------------------------------------
		0			| Clear sky
		1, 2, 3		| Mainly clear, partly cloudy, and overcast
		45, 48		| Fog and depositing rime fog
		51, 53, 55	| Drizzle: Light, moderate, and dense intensity
		56, 57		| Freezing Drizzle: Light and dense intensity
		61, 63, 65	| Rain: Slight, moderate and heavy intensity
		66, 67		| Freezing Rain: Light and heavy intensity
		71, 73, 75	| Snow fall: Slight, moderate, and heavy intensity
		77			| Snow grains
		80, 81, 82	| Rain showers: Slight, moderate, and violent
		85, 86		| Snow showers slight and heavy
		95 *		| Thunderstorm: Slight or moderate
		96, 99 *	| Thunderstorm with slight and heavy hail

		(*) Thunderstorm forecast with hail is only available in Central Europe
	*/

	const icons = {
		0: 	'src/icons/day.svg',			
		1: 	'src/icons/cloudy-day-2.svg',
		2: 	'src/icons/cloudy-day-2.svg',
		3: 	'src/icons/cloudy.svg',
		45: 'src/icons/cloudy.svg',
		48:	'src/icons/cloudy.svg',
		51: 'src/icons/rainy-5.svg',
		53: 'src/icons/rainy-5.svg',
		55: 'src/icons/rainy-5.svg',
		56: 'src/icons/rainy-5.svg',
		57: 'src/icons/rainy-5.svg',
		61: 'src/icons/rainy-5.svg',
		63: 'src/icons/rainy-5.svg',
		65: 'src/icons/rainy-5.svg',
		66: 'src/icons/rainy-5.svg',
		67:	'src/icons/rainy-5.svg',
		71: 'src/icons/snowy-6.svg',
		73: 'src/icons/snowy-6.svg',
		75: 'src/icons/snowy-6.svg',
		77: 'src/icons/snowy-6.svg',
		80: 'src/icons/rainy-5.svg',
		81: 'src/icons/rainy-5.svg',
		82: 'src/icons/rainy-5.svg',
		85: 'src/icons/snowy-6.svg',
		86: 'src/icons/snowy-6.svg',
		95: 'src/icons/thunder.svg',
		96: 'src/icons/thunder.svg',
		99: 'src/icons/thunder.svg',
	}

	// Set header icon to reflect if it's currently day or night time.
	const now = new Date();
	const current_hour 	= now.getHours();
	const current_min 	= now.getMinutes();
	const sunset_hour 	= props.sunset[0] + props.sunset[1];
	const sunset_min 	= props.sunset[3] + props.sunset[4];
	
	if((current_hour >= sunset_hour) && (current_min >= sunset_min)) {
		icons[0] = 'src/icons/night.svg';
		icons[1] = 'src/icons/cloudy-night-2.svg';
		icons[2] = 'src/icons/cloudy-night-2.svg';
		icons[3] = 'src/icons/cloudy-night-2.svg';
		icons[45] = 'src/icons/cloudy-night-2.svg';
	} else {
		icons[0] = 'src/icons/day.svg';
		icons[1] = 'src/icons/cloudy.svg';
		icons[2] = 'src/icons/cloudy.svg';
		icons[3] = 'src/icons/cloudy.svg';
		icons[45] = 'src/icons/cloudy.svg';
	}

	// Need to do sunrise

	return (
		<header className='header'>
			
			<div className='header-left'>
				<img className='weather-icon large' src={icons[props.iconCode]}/>
				<div className='header-current-temp'>
					{/* <span datacurrenttemp="true">13</span>&deg; */}
					<span>{props.currenttemp}</span>&deg;
					{/* <span datacurrenttemp="true">13</span>&deg; */}
				</div>
				<p id="location-city">{props.location}</p> {/* Need to get city location dynamically */}
			</div>

			<div className='header-right'>
				<div className='info-group'>
					<div className='label'>High</div>
					<div><span>{props.currenthigh}</span>&deg;</div>
					{/* <div><span datacurrenthigh="true">15</span>&deg;</div> */}
				</div>
				<div className='info-group'>
					<div className='label'>Wind</div>
					<div>
						<span>{props.currentwind}</span>
						{/* <span datacurrentwind="true">10</span> */}
						<span className='value-sub-info'> km/h</span>
					</div>
				</div>
				<div className='info-group'>
					<div className='label'>UV Index</div>
					<div><span>{props.uv}</span></div>
					{/* <div><span data-uv="true">1</span></div> */}
				</div>
				<div className='info-group'>
					<div className='label'>Low</div>
					<div><span>{props.currentlow}</span>&deg;</div>
					{/* <div><span datacurrentlow="true">12</span>&deg;</div> */}
				</div>
				<div className='info-group'>
					<div className='label'>Precip</div>
					<div>
						<span>{props.currentprecip}</span>
						{/* <span datacurrentprecip="true">15</span> */}
						<span className='value-sub-info'> mm</span>
					</div>
				</div>
				<div className='info-group'>
					<div className='label'>Sunset</div>
					<div>
						<span>{props.sunset}</span>
						{/* <span datasunset="true">18:14</span> */}
						<span className='value-sub-info'></span>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header