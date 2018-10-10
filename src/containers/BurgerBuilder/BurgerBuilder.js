import React, { Component } from 'react';
import Aux from '../../hoc/AuxHolder/AuxHolder';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandlerWrapper from '../../hoc/errorHandlerWrapper/errorHandlerWrapper';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.3,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios
			.get('https://burger-app-reactjs-17b8b.firebaseio.com/ingredients.json')
			.then((response) => {
				console.log(response);
				this.setState({ ingredients: response.data });
			})
			.catch((error) => {
				console.log(error);
				this.setState({ error: true });
			});
	}

	addInredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];

		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeInredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];

		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const priceDeduction = INGREDIENT_PRICES[type];

		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	updatePurchaseState(ingredients) {
		var sum = Object.keys(ingredients)
			.map((ingredientsKeys) => {
				return ingredients[ingredientsKeys];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({
			purchasable: sum > 0
		});
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	closeModalHandler = () => {
		this.setState({ purchasing: false });
	};

	cancelPurchaseHandler = () => {
		this.setState({ purchasing: false });
	};

	continiuePurchaseHandler = () => {
		this.setState({
			loading: true
		});

		const orderData = {
			ingreedients: this.state.ingredients,
			price: this.state.totalPrice,
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
					purchasing: false,
					loading: false
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					purchasing: false,
					loading: false
				});
			});
	};

	render() {
		let disabledInfo = { ...this.state.ingredients };

		let orderSummary = null;
		let burger = <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientRemove={this.removeInredientHandler}
						ingredientAdded={this.addInredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
					cancelPurchaseHandler={this.cancelPurchaseHandler}
					continiuePurchaseHandler={this.continiuePurchaseHandler}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} dontShowModal={this.closeModalHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default errorHandlerWrapper(BurgerBuilder, axios);
