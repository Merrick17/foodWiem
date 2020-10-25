import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import './App.css'
import Map from './components/Map'
class App extends React.Component {
  render() {
    return (
      <ToastProvider placement="top-center">
        <Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={Map} />
            </Switch>
          </Router>
        </Fragment>
      </ToastProvider>
    )
  }
}

export default App
