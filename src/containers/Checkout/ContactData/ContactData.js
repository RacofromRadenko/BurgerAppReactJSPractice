import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
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
			price: this.props.price,
			customer: {
				name: 'Milojica Petrovic',
				address: {
					city: 'Bremen',
					zipCode: 31245,
					email: 'test@test.com'
				},
				deliveryMethod: 'fastest'
			}
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
				<input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
				<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
				<input className={classes.Input} type="email" name="email" placeholder="Your Email" />
				<input className={classes.Input} type="text" name="street" placeholder="Street" />
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