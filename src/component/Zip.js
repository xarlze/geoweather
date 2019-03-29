import React, { Component } from 'react'

export default class Zip extends Component {
  render() {
    return (
      <input
        value={this.props.zip}
        onChange={e=>this.props.changeFunc(e.target.value)}
        placeholder="Zip/City"
        onClick={this.props.clickFunc}
      />
    )
  }
}