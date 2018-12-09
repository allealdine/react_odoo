import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

class App extends Component {

  state = {
    events: [],
  }

  componentWillMount() {
    this.callBackendAPI()
    .then(res => {this.setState({ events: res.events });})
    .catch(err => {console.log('ERROR:', err)});
  }
  
  callBackendAPI = async () => {
    const response = await fetch('/event_lists');
    const body = await response.json();
    if (response.status !== 200) {
        throw Error(body.message)
    }
    return body;
  }

  render() {

    var items = _.map(this.state.events, (event) => {
      return {
        id: event.id,
        name: event.name,
        date_begin: event.date_begin,
        date_end: event.date_end
      }
    })
    items = _.compact(items);
    items = _.map(items, (item) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.date_begin}</td>
          <td>{item.date_end}</td>
        </tr>
      );
    })

    return (
      <div className='App'>
        <header className='App-header'>
          <img className='App-logo' src={logo} alt="logo" />
        </header>
        <div className='container'>
          <h1>Welcome to our website</h1>
          <h4>Join us at our Events:</h4>
          <table className='table'>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>            
              {items}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
