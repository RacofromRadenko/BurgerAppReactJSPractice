import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: ''
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your City'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your E-Mail'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: ''
			}
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		console.log(this.props.ingredients);

		this.setState({
			loading: true
		});

		const orderData = {
			ingredients: this.props.ingredients,
			price: this.props.price
		};

		axios
			.post('/orders.json', orderData)
			.then((response) => {
				console.log(response);
				this.setState({
					loading: false
				});
				this.props.history.push('/');
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					loading: false
				});
			});
	};

	render() {
		let form = (
			<form>
				<Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
				<Input inputtype="input" type="text" name="name" placeholder="Your Name" />
				<Input inputtype="input" type="email" name="email" placeholder="Your Email" />
				<Input inputtype="input" type="text" name="street" placeholder="Street" />
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data...</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
