import React from 'react';
import { Link } from 'react-router-dom';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import './style.scss';

export default class Chart extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log(this.props.location.state.question);
    let data = [];
    this.props.location.state.question.answers.forEach((answer) => {
      data.push({
        name: answer.answer,
        value: answer.count
      })
    });

    this.state = {
      question: this.props.location.state.question.question,
      data: data,
      color: ['#0088FE', '#00C49F', '#FF8042', '#8c4646', '#0e3300', '#a1f200', '#e56739', '#4040ff', '#ff40f2', '#FFBB28']
    }
    // this.state = {
    //   data: [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
    //           {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
    //           {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}]
    // }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">Result</div>
              <div className="card-body">
                <h5 className="card-title">{this.state.question}</h5>
                <div className="card-legend">
                  {
                    this.state.data.map((entry, index) => {
                      return <div style={{backgroundColor: this.state.color[index % this.state.color.length]}} key={'legend-' + index}>
                        {entry.name} ({entry.value})
                      </div>
                    })
                  }
                </div>
                <PieChart width={500} height={300}>
                  <Pie
                    data={this.state.data}
                    cx={250}
                    cy={150}
                    innerRadius={5}
                    outerRadius={80}
                    fill="#8884d8" >
                  	{
                    	this.state.data.map((entry, index) => <Cell fill={this.state.color[index % this.state.color.length]} key={'chart-' + index}/>)
                    }
                  </Pie>
                  <Tooltip/>
                </PieChart>
                <Link to="/">
                  <button type="button" className="btn btn-outline-success">back</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>

    );
  }
}
