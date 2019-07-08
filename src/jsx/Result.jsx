import React, {Component} from 'react'
import style from './../styles/styles.less';

//  https://github.com/glennreyes/react-countup
import CountUp from 'react-countup';

// http://recharts.org/en-US
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

class Result extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={style.result_container}>
        <CountUp
          decimal='.'
          decimals={0}
          delay={0}
          duration={2}
          end={this.props.end}
          onEnd={() => {}}
          onStart={() => {}}
          prefix=''
          separator=','
          start={this.props.start}
          suffix=""
          useEasing={true}
        >
          {({ countUpRef }) => (
            <div className={style.counter_container}>
              <span className={style.counter_value} ref={countUpRef} />
            </div>
          )}
        </CountUp>
        <p>At the end of the year 2020 there will be 7,794,798,739 of us.</p>
        <div className={style.chart_container}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={this.props.data}>
              <XAxis dataKey="year" interval={149}/>
               <Tooltip formatter={(value, name, props) => {
                  return ['World population ' + value.toLocaleString()];
                }} 
                labelFormatter={(value, name, props) => {
                  return ['Year ' + value]
                }}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="1 1"/>
              <Line type="monotone" dataKey="population" stroke="#000" dot={false} activeDot={false} isAnimationActive={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}

export default Result;