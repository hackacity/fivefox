import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'

if (process.env.NODE_ENV !== 'production') {
    console.log('Server running in Development mod!');
}

ReactDOM.render(<Home />, document.getElementById('app'))