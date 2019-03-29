import React, { Component } from 'react';

export default class Main extends Component {
    render(){
        return(
            <div 
                className="main"
                style={this.props.main?null:{width: "100px"}}
            >
                {this.props.main}
            </div>
        )
    }
}