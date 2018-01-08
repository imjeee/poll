import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Home from './client/page/Home.jsx';
// import Chart from './client/page/Chart.jsx';

const Chart = () => (
  <div>chart aaaa</div>
)

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Chart} />
        <Route exact path="/chart" component={Home} />
      </Switch>
    </BrowserRouter>,
document.getElementById('root'));
