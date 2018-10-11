import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 1,
			cheese: 1,
			meat: 1,
			beacon: 1
		}
	};

	render() {
		return (
			<div>
				<Route exact path="/checkout">
					<CheckoutSummary ingredients={this.state.ingredients} />
				</Route>
			</div>
		);
	}
}

export default Checkout;
