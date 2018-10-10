import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/AuxHolder/AuxHolder';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		console.log('[Modal Stateful component]');
		return nextProps.show !== this.props.show || nextProps.children || this.props.children;
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.dontShowModal} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
