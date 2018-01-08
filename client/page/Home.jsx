import React from 'react';
import axios from 'axios';

import './style.scss';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      question: {
        answers: []
      },
      disabledSubmitBtn: true,
      loading: false
    }
    this.loadCommentsFromServer();
  }
  loadCommentsFromServer() {
    axios.get('http://localhost:3001/api/getARandomQuestion')
    .then(res => {
      this.setState({
        question: res.data
      });
    })
  }
  clickSubmit(e) {
    this.setState({
      disabledSubmitBtn: true,
      loading: true
    });
    axios.post('http://localhost:3001/api/updateAnswerInQuestion', {
      _id: this.state.question._id,
      _updatedFieldId: this.state._updatedFieldId
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        disabledSubmitBtn: false,
        loading: false
      });
    })
  }
  clickRadioBtn(fieldId) {
    this.setState({
      disabledSubmitBtn: false,
      _updatedFieldId: fieldId
    });
  }
  render() {
    return (
     <div id="app">
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="card">
                <div className="card-header">
                  Question
                </div>
                <div className="card-body">
                  <h5 className="card-title">{this.state.question.question}</h5>
                  {this.state.question.answers.map((answer, index) => {
                    return (
                      <div className="form-check" key={'class-'+index} onClick={this.clickRadioBtn.bind(this, answer._id)}>
                        <label className="form-check-label" htmlFor={'radio-'+index} key={'label-'+index} >
                          {answer.answer}
                        </label>
                        <input className="form-check-input"
                          type="radio"
                          name="answersRadios"
                          id={'radio-'+index}
                          value={answer.answer}
                          key={'input-'+index} />
                        <span className="radioBtn" htmlFor={'radio-'+index} ></span>
                      </div>
                    )
                  })}
                  <button type="button"
                    disabled={this.state.disabledSubmitBtn}
                    className="btn btn-outline-success"
                    onClick={this.clickSubmit.bind(this)}>
                      {this.state.loading ? <i className="fa fa-cog fa-spin fa-fw margin-bottom"></i> : null }
                      submit
                  </button>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}
