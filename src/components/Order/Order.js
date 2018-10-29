import React from 'react';

import classes from './Order.css';

const order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}
	console.log(props.ingredients);
	const ingredientOutput = ingredients.map((ig) => {
		return (
			<span className={classes.Ingredient} key={ig.name}>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients:{ingredientOutput}</p>
			<p>
				price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
			<div>{props.children}</div>
		</div>
	);
};

export default order;