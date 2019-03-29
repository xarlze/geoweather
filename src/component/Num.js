import React, { Component } from 'react';

export default class Num extends Component {
    render(){
        return(
            <div
                className="num"
                style={this.props.num?null:{width: "26px"}}
            >
                {this.props.num}
            </div>
        )
    }
}