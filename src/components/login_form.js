import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		error: '',
		loading: false
	};

	onButtonPress() {
		const { email, password } = this.state;
		this.setState({
			error: '',
			loading: true
		});
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFail.bind(this));
			});
	}

	onLoginFail() {
		this.setState({
			error: 'Authentication Failed.',
			loading: false
		});
	}

	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			error: '',
			loading: false
		});
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
		}
		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log In
			</Button>
		);
	}

	renderError() {
		const { error } = this.state;
		const { errorTextStyle, errorContainerStyle } = styles;
		if (error) {
			return (
				<CardSection>
					<View style={errorContainerStyle}>
						<Text style={errorTextStyle}>
							{this.state.error}
						</Text>
					</View>
				</CardSection>
			);
		}
		return null;
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="user@gmail.com"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
				</CardSection>

				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="Qwerty1"
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
				</CardSection>
				{this.renderError()}
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	errorContainerStyle: {
		flex: 1,
		alignSelf: 'stretch'
	}
};

export default LoginForm;
