import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/login_form';

class App extends Component {
	state = {
		loggedIn: null
	};

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyCMe_x-Z4c76lOcyzvRcMyo-kXB9zxDIH0',
			authDomain: 'authentication-79d4f.firebaseapp.com',
			databaseURL: 'https://authentication-79d4f.firebaseio.com',
			projectId: 'authentication-79d4f',
			storageBucket: 'authentication-79d4f.appspot.com',
			messagingSenderId: '927748030787'
		});
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					loggedIn: true
				});
			} else {
				this.setState({
					loggedIn: false
				});
			}
		});
	}

	renderContent() {
		const { contentContainerStyle } = styles;
		switch (this.state.loggedIn) {
			case true:
				return (
					<View style={contentContainerStyle}>
						<Button onPress={() => firebase.auth().signOut()}>
							Log Out
						</Button>
					</View>
				);
			case false:
				return <LoginForm />;
			default:
				return (
					<View style={contentContainerStyle}>
						<Spinner size="large" />
					</View>
				);
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

const styles = {
	contentContainerStyle: {
		justifyContent: 'flex-start',
		flexDirection: 'row'
	}
};

export default App;
