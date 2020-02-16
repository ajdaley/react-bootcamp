import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';

const my_name = 'Alun Daley'
const my_handle = '@ajdaley'

ReactDOM.render(<App name={my_name} handle={my_handle}/>, document.getElementById('root'))