import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Home from './client/page/home/Home.jsx';
import Chart from './client/page/chart/Chart.jsx';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chart" component={Chart} />
      </Switch>
    </BrowserRouter>,
document.getElementById('root'));
