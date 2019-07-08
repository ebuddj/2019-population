import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://alligator.io/react/axios-react/
import axios from 'axios';

// https://underscorejs.org/
import _ from 'underscore';

// https://momentjs.com/
import * as moment from 'moment';

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
        ready:true
      }));
    }
    else {
      this.setState((state, props) => ({
        status:{
          clicked:false,
          ready:true
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
    if (event.target.value === '') {
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
      event.target.value = parseInt(event.target.max)
    }
    else if (parseInt(event.target.value) < parseInt(event.target.min)) {
      event.target.value = 0;
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
        <h3>How many people were there on your date of birth</h3>
        <div className={style.form_container}>
          <div className={style.input_container}><input onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} type="number" name="day" value={(this.state.date.day !== 0) ? this.state.date.day : ''} placeholder={1} min={1} max={31} /></div>
          <div className={style.input_container}><input onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} type="number" name="month" value={(this.state.date.month !== 0) ? this.state.date.month : ''} placeholder={1} min={1} max={12} /></div>
          <div className={style.input_container}><input onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} type="year" name="year" value={(this.state.date.year !== 0) ? this.state.date.year : ''} placeholder={1970} min={1} max={2019} /></div>
          <div className={style.submit_container}><button onClick={this.onClick.bind(this)} disabled={this.state.ready === true ? '' : 'disabled'}>Go!</button></div>
        </div>
        {(this.state.status.clicked) && <Result end={this.state.counter.end} start={this.state.counter.start} />}
        <div className={style.meta_container}>Source: <a href="https://ourworldindata.org/world-population-growth">Our World In Data</a> (0–1950), <a href="https://population.un.org/wpp/Download/Standard/Population/">United Nations</a> (1950–2020)</div>
      </div>
    );
  }
}
export default App;