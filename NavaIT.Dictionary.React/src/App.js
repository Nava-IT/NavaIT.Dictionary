import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Dictionary } from './components/Dictionary';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css'
import './custom.css'
import { Scope } from './components/Scope';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
            <Route path='/dictionary/:term' component={Dictionary} />
            <Route path='/scope/:name' component={Scope} />
      </Layout>
    );
  }
}
