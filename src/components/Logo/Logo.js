import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = () => (
	<div className={classes.Logo}>
		<a href="/">
			<img src={burgerLogo} alt="Logo" />
		</a>
	</div>
);

export default logo;
