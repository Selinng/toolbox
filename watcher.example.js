import React, { Component } from 'react'
import ComponentWatcher from './watcher'

export default class App2 extends Component {
  constructor() {
    super()
    this.state = {
      state1: true,
      state2: true
    }
    const watch = new ComponentWatcher({
      component: this,
      states: ['state1',  'state2']
    })
    watch.addWatchEffect((newVal, oldVal) => {
      console.log('newVal:', newVal, 'oldVal:', oldVal)
      console.log('--------------addWatchEffect-------------------')
    })
    watch.addWatchEffect(() => {
      console.log('--------------addWatchEffect22222222222-------------------')
    })
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState(preState => ({
            state1: !preState.state1
          }))
        }}>change state1: {this.state.state1 ? 'true' : 'false'}</button>
        <button onClick={() => {
          this.setState(preState => ({
            state2: !preState.state2
          }))
        }}>change state2:{this.state.state2? 'true' : 'false'}</button>
      </div>
    )
  }
}
