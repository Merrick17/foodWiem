import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import Map from './components/Map'
class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Map} />
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default App
