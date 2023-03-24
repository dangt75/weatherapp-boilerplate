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
		this.state={location: "Main Plot"};
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
		this.setState({location:loc});
	}
	//doesn't work, check main page for how work later
	changePage = (newpage) => {
		if (newpage=="main" || newpage=="weekly"){
			this.setState({page:newpage})
		}
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
						<li class={style.brand}><a href="#">Farmy</a></li>
						<li><a onClick={() => this.changePage("main")} href='/index'>Today</a></li>
						<li><a onClick={() => this.changePage("weekly")} href='/weekly'>Weekly</a></li>
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
						<li><a class={style.loca} onClick={() => this.changeLoc("Carrots")} href='javascript:void(0)'>Carrots</a></li>
						<li><a class={style.loca} onClick={() => this.changeLoc("Barley")} href='javascript:void(0)'>Barley</a></li>
						<li><a class={style.loca} onClick={() => this.changeLoc("Apples")} href='javascript:void(0)'>Apples</a></li>
					</ul>
				</div>
			</div>

		);
	}
}
