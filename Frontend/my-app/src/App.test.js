import React from 'react';
import renderer from 'react-test-renderer'
import App from './App';
import LogIn from './Components/Auth/LogIn';
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Common/Dashboard';
import NewTaskBar from './Components/Common/NewTaskBar';
import DisplayTask from './Components/Common/DisplayTask';
import CreateTask from './Components/Common/CreateTask';
import Navbar from './Components/Common/Navbar';

it('App component snapshot', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('LogIn component snapshot', () => {
  const tree = renderer
    .create(<LogIn />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Signup component snapshot', () => {
  const tree = renderer
    .create(<Signup />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Home component snapshot', () => {
  const tree = renderer
    .create(<Home />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Dashboard component snapshot', () => {
  const tree = renderer
    .create(<Dashboard />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('NewTaskBar component snapshot', () => {
  const tree = renderer
    .create(<NewTaskBar />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('DisplayTask component snapshot', () => {
  const tree = renderer
    .create(<DisplayTask />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('CreateTask component snapshot', () => {
  const tree = renderer
    .create(<CreateTask />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Navbar component snapshot', () => {
  const tree = renderer
    .create(<Navbar />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});