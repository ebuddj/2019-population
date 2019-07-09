import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://alligator.io/react/axios-react/
import axios from 'axios';

// https://underscorejs.org/
import _ from 'underscore';

import Result from './Result.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter:{
        end:0,
        start:0
      },
      data:[],
      date:{
        day:0,
        month:0,
        year:0
      },
      status:{
        clicked:false,
        ready:false
      }
    }
  }
  componentDidMount() {
    let self = this;
    axios.get('./data/data.json', {
    })
    .then(function (response) {
      self.setState((state, props) => ({
        data:response.data
      }));
    })
    .catch(function (error) {
    })
    .then(function () {
    });
  }
  componentWillUnMount() {

  }
  componentWillReceiveProps(props) {

  }
  checkReady() {
    if (this.state.date.day !== 0 && this.state.date.month !== 0 && this.state.date.year !== 0) {
      this.setState((state, props) => ({
        status:{
          clicked:state.status.clicked,
          ready:true
        }
      }));
    }
    else {
      this.setState((state, props) => ({
        status:{
          clicked:state.status.clicked,
          ready:false
        }
      }));
    }
  }
  onChange(event) {
    let date = {
      day:parseInt(this.state.date.day),
      month:parseInt(this.state.date.month),
      year:parseInt(this.state.date.year)
    };
    if (parseInt(event.target.value) === parseInt(event.target.min)) {
      event.target.value = parseInt(event.target.max) - 1;
    }
    else if (parseInt(event.target.value) < parseInt(event.target.min)) {
      event.target.value = parseInt(event.target.min) + 1
    }
    else if (parseInt(event.target.value) === parseInt(event.target.max)) {
      event.target.value = parseInt(event.target.min) + 1;
    }
    else if (parseInt(event.target.value) > parseInt(event.target.max)) {
      event.target.value = parseInt(event.target.max) - 1;
    }
    else if (event.target.value === '') {
      event.target.value = 0;
    }
    date[event.target.name] = parseInt(event.target.value);
    this.setState((state, props) => ({
      date:date
    }), this.checkReady);
  }
  onBlur(event) {
    let date = {
      day:parseInt(this.state.date.day),
      month:parseInt(this.state.date.month),
      year:parseInt(this.state.date.year)
    };
    if (parseInt(event.target.value) > parseInt(event.target.max)) {
      event.target.value = parseInt(event.target.max) - 1;
    }
    else if (parseInt(event.target.value) < parseInt(event.target.min)) {
      event.target.value = parseInt(event.target.min) + 1;
    }
    else if (event.target.value === '') {
      event.target.value = 0;
    }
    date[event.target.name] = parseInt(event.target.value);
    this.setState((state, props) => ({
      date:date
    }), this.checkReady);
  }
  onClick(event) {
    // https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366/27790471#27790471
    function dayNo (y, m, d) {
      return --m*31-(m>1?(1054267675>>m*3-6&7)-(y&3||!(y%25)&&y&15?0:1):0)+d;
    }
    let days_into_the_year = dayNo(this.state.date.year, this.state.date.month, this.state.date.day);
    let days_in_year = dayNo(this.state.date.year, 12, 31);
    let share_of_days = days_into_the_year / days_in_year;

    let population = this.state.data[parseInt(this.state.date.year)].population + ((this.state.data[parseInt(this.state.date.year) + 1].population - this.state.data[parseInt(this.state.date.year)].population) * share_of_days)

    this.setState((state, props) => ({
      counter:{
        end:population,
        start:this.state.data[parseInt(this.state.date.year) - Math.min(50, this.state.date.year)].population
      },
      status:{
        clicked:true,
        ready:true
      }
    }));
  }
  render() {
    return (
      <div className={style.app}>
        <h3>How many people were alive in the world on the day of your birth?</h3>
        <div className={style.form_container}>
          <div className={style.input_container}>
            <input onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} type="number" name="day" value={(this.state.date.day !== 0) ? this.state.date.day : ''} className={style.day_input} placeholder={1} min={0} max={32} />
            <div className={style.label}>day</div>
          </div>
          <div className={style.input_container}>
            <input onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} type="number" name="month" value={(this.state.date.month !== 0) ? this.state.date.month : ''} className={style.month_input} placeholder={1} min={0} max={13} />
            <div className={style.label}>month</div>
          </div>
          <div className={style.input_container}>
            <input onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} type="number" name="year" value={(this.state.date.year !== 0) ? this.state.date.year : ''} className={style.year_input} placeholder={1970} min={0} max={2020} />
            <div className={style.label}>year</div>
          </div>
          <div className={style.submit_container}>
            <button onClick={this.onClick.bind(this)} disabled={this.state.status.ready === true ? '' : 'disabled'}>Go!</button>
          </div>
        </div>
        {(this.state.status.clicked) && <Result end={this.state.counter.end} start={this.state.counter.start} data={this.state.data} />}
        <div className={style.meta_container}>Source: <a href="https://ourworldindata.org/world-population-growth" target="_blank">Our World In Data</a> (0–1950), <a href="https://population.un.org/wpp/Download/Standard/Population/" target="_blank">United Nations</a> (1950–2020)</div>
      </div>
    );
  }
}
export default App;