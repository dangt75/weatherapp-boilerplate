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
import classNames from 'classnames';
export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.setState({page:"main"});
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

	fetchWeeklyData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var newurl="https://api.open-meteo.com/v1/forecast?latitude=51.53&longitude=-0.04&forecast_days=8&hourly=weathercode&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto";
		
		$.ajax({
			url: newurl,
			dataType: "json",
			success : this.parseWeeklyResponse,
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
				<div>
					{(this.state.page=="weekly") ? 'it be workin tho' : null}
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData } text="Display Weather"/> : null }
				</div>
			</div>
		);
	}
	
	//TODO
	//container is full width, flex row
	//days and main are flex column of equal percent (12.5%)
	//alt has color overlay
	//reading must use position bottom depending on avgp
	//considering rules 0-100 in intervals of 10, formatting data in parse
	//easiest way, actual rules in hard way
	//only do hard way if plenty of time
	//worst comes to worst, fake static element from figma
	newrender(){
		return(
			<div class={weeklystyle.container}>
				<div class={weeklystyle.days}>
					<div class={weeklystyle.day}>{this.state.days[0]}</div>
					<div class={weeklystyle.day}>{this.state.days[1]}</div>
					<div class={weeklystyle.day}>{this.state.days[2]}</div>
					<div class={weeklystyle.day}>{this.state.days[3]}</div>
					<div class={weeklystyle.day}>{this.state.days[4]}</div>
					<div class={weeklystyle.day}>{this.state.days[5]}</div>
					<div class={weeklystyle.day}>{this.state.days[6]}</div>
					<div class={weeklystyle.day}>{this.state.days[7]}</div>
				</div>
				<div class={weeklystyle.main}>
					<div class={weeklystyle.col}>
						<div class={weeklystyle.reading}>
							<div class={weeklystyle.cond}>{this.state.avgc[0]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[0]}</div>
						</div>
						<div class={classNames(weeklystyle.reading,weeklystyle.alt)}>
							<div class={weeklystyle.cond}>{this.state.avgc[1]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[1]}</div>
						</div>
						<div class={weeklystyle.reading}>
							<div class={weeklystyle.cond}>{this.state.avgc[2]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[2]}</div>
						</div>
						<div class={classNames(weeklystyle.reading,weeklystyle.alt)}>
							<div class={weeklystyle.cond}>{this.state.avgc[3]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[3]}</div>
						</div>
						<div class={weeklystyle.reading}>
							<div class={weeklystyle.cond}>{this.state.avgc[4]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[4]}</div>
						</div>
						<div class={classNames(weeklystyle.reading,weeklystyle.alt)}>
							<div class={weeklystyle.cond}>{this.state.avgc[5]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[5]}</div>
						</div>
						<div class={weeklystyle.reading}>
							<div class={weeklystyle.cond}>{this.state.avgc[6]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[6]}</div>
						</div>
						<div class={classNames(weeklystyle.reading,weeklystyle.alt)}>
							<div class={weeklystyle.cond}>{this.state.avgc[7]}</div>
							<div class={weeklystyle.temp}>{this.state.avgt[7]}</div>
						</div>
					</div>
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

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});
	}

	parseWeeklyResponse = (parsed_json) => {
		console.log(parsed_json);
		var weekday=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		var tday = (new Date).getDay();
		var weekdays=[];
		var hours = [13];
		for(let i=0; i<7; i++){
			hours.push(hours[-1]+24);
		}
		var avgtemp = [];
		var conditions = [];
		var precipitation = [];

		for(let i=0; i<8; i++){
			avgtemp.push((parsed_json["daily"][temperature_2m_max]+parsed_json["daily"][temperature_2m_min])/2);
			conditions.push(parsed_json["hourly"]["weathercode"][hours[i]]);
			precipitation.push(parsed_json["daily"]["rain_sum"]);
			weekdays.push(weekday[tday])
			tday=(tday+1)%7
		}

		// set states for fields so they could be rendered later on
		this.setState({
			days: weekdays,
			avgt: avgtemp,
			avgc : conditions,
			avgp: precipitation
		});
	}
}
