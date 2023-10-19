import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchfield } from '../actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(searchField(event.target.value))
	}
}

function App() {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState('');
	const [count, setCount] = useState(0);

	useEffect(()=> {
		console.log(this.props.store.getState())
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {setRobots(users)});
		console.log(count);
	},[count]) //only run if count chagnes.

	/*const onSearchChange = (event) => {
		setSearchfield(event.target.value)
	}*/
	const { searchField, onSearchChange } = this.props;
	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase());
	})
	return !robots.length ?
		<h1>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<button onClick={()=>setCount(count+1)}>Click Me!</button>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
		);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
