import React from 'react';
import classes from './Burger.css';
import BurgerIngreediant from './BurgerIngreediant/BurgerIngreediant';

const burger = (props) => {
	console.log(props);
	var transformedIngredients = Object.keys(props.ingredients)
		.map((transformedKey) => {
			return [ ...Array(props.ingredients[transformedKey]) ].map((_, index) => {
				return <BurgerIngreediant key={transformedKey + index} type={transformedKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngreediant type="bread-top" />
			{transformedIngredients}
			<BurgerIngreediant type="bread-bottom" />
		</div>
	);
};

export default burger;
