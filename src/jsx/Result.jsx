import React, {Component} from 'react'
import style from './../styles/styles.less';

//  https://github.com/glennreyes/react-countup
import CountUp from 'react-countup';

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
        <div>At the end of this year 2020 there will be 7,794,798,739 of us.</div>
      </div>
    )
  }
}

export default Result;