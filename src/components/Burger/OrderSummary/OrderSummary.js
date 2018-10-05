import React from 'react';
import Aux from '../../../hoc/AuxHolder/AuxHolder';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igKeys) => {
		return (
			<li key={igKeys}>
				<span style={{ textTransform: 'capitalize' }}> {igKeys}</span> {props.ingredients[igKeys]}
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your order:</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total price: {props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={props.cancelPurchaseHandler}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.continiuePurchaseHandler}>
				CONTINUE
			</Button>
		</Aux>
	);
};

export default orderSummary;
