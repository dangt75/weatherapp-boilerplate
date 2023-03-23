// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import the font awesome icon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'


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
		var url = "http://api.openweathermap.org/data/2.5/weather?q=Manchester&units=metric&APPID=3433317211f5f05d30c5f4a41a16cd4e";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// a call to fetch weather data via wunderground
	fetchForecastData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=Manchester&units=metric&APPID=3433317211f5f05d30c5f4a41a16cd4e";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseForecastResponse,
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
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }>
					<div class= {style.box}>
						<p>{this.state.hr1}</p>
						<p><FontAwesomeIcon icon={faSun} /></p>
						<p>{this.state.forecastTemp1}</p>

					</div>
					<div class= {style.box}>
						<p>{this.state.hr2}</p>
						<p><FontAwesomeIcon icon={faCloudRain} /></p>
						<p>{this.state.forecastTemp2}</p>
					</div>
					<div class= {style.box}>
						<p>{this.state.hr3}</p>
						<FontAwesomeIcon icon={faMoon} />
						<p>{this.state.forecastTemp3}</p>
					</div>
				</div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ () => {
						this.fetchWeatherData();
						this.fetchForecastData();
						} }/ > : null 
					}	
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'].toFixed();
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}

	parseForecastResponse = (parsed_json) => {
		var foreCast_temp_c1 = parsed_json['list'][1]['main']['temp'].toFixed() + " °";
		var icon1 = parsed_json['list'][1]['weather']['icon'];
		var dateTime1 = parsed_json['list'][1]['dt_txt'];
		var dateArr1 = dateTime1.split(" ");
		var Arr1 = dateArr1[1].split(":")
		var hour1 = Arr1[0]

		var foreCast_temp_c2 = parsed_json['list'][3]['main']['temp'].toFixed() + " °";
		var icon2 = parsed_json['list'][3]['weather']['icon'];
		var dateTime2 = parsed_json['list'][3]['dt_txt'];
		var dateArr2 = dateTime2.split(" ");
		var Arr2 = dateArr2[1].split(":")
		var hour2 = Arr2[0]

		var foreCast_temp_c3 = parsed_json['list'][5]['main']['temp'].toFixed() + " °";
		var icon3 = parsed_json['list'][5]['weather']['icon'];
		var dateTime3 = parsed_json['list'][5]['dt_txt'];
		var dateArr3 = dateTime3.split(" ");
		var Arr3 = dateArr3[1].split(":")
		var hour3 = Arr3[0]

		console.log(icon1)

		// set states for fields so they could be rendered later on
		this.setState({
			icon1: icon1,
			forecastTemp1: foreCast_temp_c1,
			hr1 : hour1,
			icon2: icon2,
			forecastTemp2: foreCast_temp_c2,
			hr2 : hour2,
			icon3: icon3,
			forecastTemp3: foreCast_temp_c3,
			hr3 : hour3
		});      
	}
}
