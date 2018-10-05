import React, { Component } from 'react';
import classes from './BurgerIngreediant.css';
import PropTypes from 'prop-types';

class BurgerIngreediant extends Component {
	render() {
		let ingreedient = null;

		switch (this.props.type) {
			case 'bread-bottom':
				ingreedient = <div className={classes.BreadBottom} />;
				break;
			case 'bread-top':
				ingreedient = (
					<div className={classes.BreadTop}>
						<div className={classes.Seeds1} />
						<div className={classes.Seeds2} />
					</div>
				);
				break;
			case 'meat':
				ingreedient = <div className={classes.Meat} />;
				break;
			case 'salad':
				ingreedient = <div className={classes.Salad} />;
				break;
			case 'bacon':
				ingreedient = <div className={classes.Bacon} />;
				break;
			case 'cheese':
				ingreedient = <div className={classes.Cheese} />;
				break;

			default:
				ingreedient = null;
		}

		return ingreedient;
	}
}

BurgerIngreediant.propTypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngreediant;
