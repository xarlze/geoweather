import React, { Component } from 'react';

export default class Temp extends Component {
    render(){
        return(
            <div
                className="temp"
                style={this.props.temp?null:{width: "26px"}}
            >
                {this.props.temp}
            </div>
        )
    }
}