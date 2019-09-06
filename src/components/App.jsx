import React from 'react';
import Container from 'react-bootstrap/Button';
import LeftSideMenu from './LeftSideMenu.jsx';
import RightContent from './RightContent.jsx';
import '../App.css';

export default class App extends React.Component {
	render() {
		return (
			<Container>
				<LeftSideMenu />
				<RightContent />
			</Container>
		);
	}
}