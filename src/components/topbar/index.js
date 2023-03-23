// import preact
import { h, render, Component } from 'preact';
// import stylesheet
import style from './nav';
//import classnames utility
import classNames from 'classnames';

export default class TopBar extends Component {
	
	constructor(){
		super();
		//determines sidebar presence
		this.state={menu:false};
		//determines location dropdown presence
		this.state={loc:false};
		//determines location selected
		this.state={location: "Ohio"}
	}

	//it's self-evident what these functions do
	openMenu = () => {
		this.setState({menu:true});
	}

	closeMenu = () => {
		this.setState({menu:false});
	}

	openLoc = () => {
		this.setState({loc: !this.state.loc});
	}

	changeLoc = (loc) => {
		this.setState({location:loc})
	}
	
	// rendering a sidebar and location picker
	//first is navigation, with a button that opens the sidebar, and then links, and a button to close it
	//after that is a location display with a dropdown button, with a list of other locations to pick. picked locations update the display
	render() {
		return (
			<div class={style.header}>
				<div>
					<button class={classNames(style.openbutton,{[`${style.openbuttonopen}`] : this.state.menu})} onClick={ this.openMenu }>&#9776;</button>
					<nav class={classNames(style.nav,{[`${style.navopen}`] : this.state.menu})}>
						<button class={style.closebutton} onClick={this.closeMenu}>⛌</button>
					<ul>
						<li class={style.brand}><a href="#">Weather App</a></li>
						<li><a href="#">Today</a></li>
						<li><a href="#">Weekly</a></li>
						<li><a href="#">Alerts</a></li>
						<li><a href="#">Settings</a></li>
					</ul>
					</nav>	  
				</div>
				<div class={style.location}>
					<div class={style.loctop}>
						<div class={style.locname}>
							{this.state.location}
						</div>
						<button class={style.locpicker} onClick={this.openLoc}>
							<img src='../../assets/icons/down-arrow.png'></img>
						</button>
					</div>
					
					<ul class={classNames(style.locul,{[`${style.loculopen}`] : this.state.loc})} id={style.locations}>
						<li><a class={style.loca} onClick={() => this.changeLoc("loc1")} href='javascript:void(0)'>loc1</a></li>
						<li><a class={style.loca} onClick={() => this.changeLoc("loc2")} href='javascript:void(0)'>loc2</a></li>
						<li><a class={style.loca} onClick={() => this.changeLoc("loc3")} href='javascript:void(0)'>loc3</a></li>
					</ul>
				</div>
			</div>
	
		);
	}
}
