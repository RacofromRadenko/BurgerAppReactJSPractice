import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div className={classes.MobileOnly}>
			<DrawerToggle showSideDrawer={props.showDrawer} toggleHandler={props.toggleMenuButton} />
		</div>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

export default toolbar;
