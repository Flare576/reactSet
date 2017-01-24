import React, { Component } from 'react';
import Table from '../containers/table'
import Controls from '../containers/controls'

export default class App extends Component {
  render() {
    return (
      <div>
        <Table />
        <Controls className="col-xs-2"/>
      </div>
    );
  }
}
