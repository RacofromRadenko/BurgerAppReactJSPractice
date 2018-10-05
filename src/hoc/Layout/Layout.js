import React, { Component } from 'react';
import Aux from '../AuxHolder/AuxHolder';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	openSideDrawerHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	};

	toggleMenuButtonHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar toggleMenuButton={this.toggleMenuButtonHandler} />
				<SideDrawer open={this.state.showSideDrawer} close={this.openSideDrawerHandler} />
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
