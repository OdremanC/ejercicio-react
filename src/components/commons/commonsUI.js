import React from 'react'

export default class CommonsUI extends React.Component {
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve)
    })
  }
}
