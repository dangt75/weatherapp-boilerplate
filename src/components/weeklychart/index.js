// import preact
import { h, render, Component } from 'preact';
// import stylesheet
import weeklystyle from './style';
//import classnames utility
import classNames from 'classnames';
//import fake data
import data from '../../assets/weeklydata.json';
import Button from '../button';
import style_iphone from '../button/style_iphone';
import $ from 'jquery';
import codes from '../../assets/wmocodes.json';
import coords from '../../assets/coords.json';
export default class WeeklyChart extends Component {

	constructor(props){
		super(props);
		this.setState({display:true});
		this.setState({temp:""});
		this.setState({days:[]});
		this.setState({avgt:[]});
		this.setState({avgc:[]});
		this.setState({avgp:[]});
		//this.parseWeeklyResponse(data);
	}

	componentDidMount(){
		this.setState({location : this.props.other.current.state.location});

	}

	fetchWeeklyData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		console.log(this.state.location);
		var newurl="https://api.open-meteo.com/v1/forecast?latitude="+coords[this.state.location][0]+"&longitude="+coords[this.state.location][1]+"&forecast_days=8&hourly=weathercode&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto";
		$.ajax({
			url: newurl,
			dataType: "json",
			success : this.parseWeeklyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	parseWeeklyResponse = (parsed_json) => {
		var weekday=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
		var tday = (new Date).getDay();
		var weekdays=[];
		var hours = [13];
		for(let i=0; i<7; i++){
			hours.push(hours[hours.length-1]+24);
		}
		var avgtemp = [];
		var conditions = [];
		var precipitation = [];
		//currently rain level is calculated into discrete values, 0 to 10
		for(let i=0; i<8; i++){
			let tmx=parsed_json["daily"]["temperature_2m_max"][i]
			let tmn=parsed_json["daily"]["temperature_2m_min"][i]
			let tavg=Math.round((tmx+tmn)/2)
			avgtemp.push(tavg);
			conditions.push(parsed_json["hourly"]["weathercode"][hours[i]]);
			let x = Math.round(parsed_json["daily"]["rain_sum"][i])
			//change to maths limiting later
			if (x>10){
				x=10;
			}
			precipitation.push(x);
			weekdays.push(weekday[tday])
			tday=(tday+1)%7
		}
		//ugly, refactor later
		var classes=[weeklystyle.zero,weeklystyle.one,weeklystyle.two,weeklystyle.three,weeklystyle.four,weeklystyle.five,weeklystyle.six,weeklystyle.seven,weeklystyle.eight,weeklystyle.nine,weeklystyle.ten];
		var padding=[];
		for(let i=0; i<precipitation.length; i++){
			padding.push(classes[precipitation[i]]);
		}

		// set states for fields so they could be rendered later on
		this.setState({
			days: weekdays,
			avgt: avgtemp,
			avgc : conditions,
			avgp: padding
		});
	}

	render(){
		if(this.state.display){
			return(
				<div class={style_iphone.container}>
						{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeeklyData } text="Display Weather"/> : null }
				</div>
			);
		}
		else{
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
					</div>
					<div class={weeklystyle.main}>
						<div class={classNames(weeklystyle.reading,[`${this.state.avgp[0]}`])}>
							<div class={weeklystyle.cond}><img src={'../../assets/icons/'+this.state.avgc[0]+'.svg'}></img></div>
							<div class={weeklystyle.temp}>{this.state.avgt[0]+" °"}</div>
						</div>
						<div class={classNames(weeklystyle.reading,weeklystyle.alt,[`${this.state.avgp[1]}`])}>
							<div class={weeklystyle.cond}><img src={'../../assets/icons/'+this.state.avgc[1]+'.svg'}></img></div>
							<div class={weeklystyle.temp}>{this.state.avgt[1]+" °"}</div>
						</div>
						<div class={classNames(weeklystyle.reading,[`${this.state.avgp[2]}`])}>
							<div class={weeklystyle.cond}><img src={'../../assets/icons/'+this.state.avgc[2]+'.svg'}></img></div>
							<div class={weeklystyle.temp}>{this.state.avgt[2]+" °"}</div>
						</div>
						<div class={classNames(weeklystyle.reading,weeklystyle.alt,[`${this.state.avgp[3]}`])}>
							<div class={weeklystyle.cond}><img src={'../../assets/icons/'+this.state.avgc[3]+'.svg'}></img></div>
							<div class={weeklystyle.temp}>{this.state.avgt[3]+" °"}</div>
						</div>
						<div class={classNames(weeklystyle.reading,[`${this.state.avgp[4]}`])}>
							<div class={weeklystyle.cond}><img src={'../../assets/icons/'+this.state.avgc[4]+'.svg'}></img></div>
							<div class={weeklystyle.temp}>{this.state.avgt[4]+" °"}</div>
						</div>
						<div class={classNames(weeklystyle.reading,weeklystyle.alt,[`${this.state.avgp[5]}`])}>
							<div class={weeklystyle.cond}><img src={'../../assets/icons/'+this.state.avgc[5]+'.svg'}></img></div>
							<div class={weeklystyle.temp}>{this.state.avgt[5]+" °"}</div>
						</div>
						<div class={classNames(weeklystyle.reading,[`${this.state.avgp[6]}`])}>
							<div class={weeklystyle.cond}><img src={'../../assets/icons/'+this.state.avgc[6]+'.svg'}></img></div>
							<div class={weeklystyle.temp}>{this.state.avgt[6]+" °"}</div>
						</div>
					</div>
				</div>
			);
		}

	}
}
