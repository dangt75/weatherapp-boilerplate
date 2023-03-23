// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
//import WMO Weather Codes
import codes from '../../assets/wmocodes.json';
//import Header Bar for location change and menu navigation
import TopBar from '../topbar';
export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var newurl="https://api.open-meteo.com/v1/forecast?latitude=51.53&longitude=-0.04&forecast_days=1&hourly=temperature_2m,weathercode";
		
		$.ajax({
			url: newurl,
			dataType: "json",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<TopBar/>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData } text="Display Weather"/> : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		console.log(parsed_json);
		var hour = (new Date).getHours();
		var location = "Current Location";
		var temp_c = parsed_json["hourly"]['temperature_2m'][hour];
		var conditions = codes[parsed_json['hourly']['weathercode'][hour]];

		if ('rain' in parsed_json) {
			if ('1h' in parsed_json['rain']) {
				var rain_1 = parsed_json['rain']['1h'];
			}
			if ('3h' in parsed_json['rain']) {
				var rain_2 = parsed_json['rain']['3h'];
			}
		} else {
			var rain_1 = 0;
			var rain_2 = 0;
		}
		var wind = parsed_json['wind']['speed'];
		var wind_deg = parsed_json['wind']['deg'];
		var humidity = parsed_json['main']['humidity'];
		var pressure = parsed_json['main']['pressure'];


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			rain : rain_1,
			rain3h : rain_2,
			wSpeed : wind,
			wDir : wind_deg,
			humid : humidity,
			psi : pressure
		});
	}
}
