import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './HomeNav.css';

export default class HomeNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            blink: false
        }
    }
    componentDidMount(){
        setInterval(function(){
            this.setState({
                blink: true
            })
            setTimeout(() => {
                this.setState({
                    blink: false
                })
                setTimeout(() => {
                    this.setState({
                        blink: true
                    })
                    setTimeout(() => {
                        this.setState({
                            blink: false
                        })
                    }, 100);
                }, 100);
            }, 100);
        }.bind(this), 3044);
    }
  render() {
    const locationPopup = document.querySelector("#locationIndicator")
    if(locationPopup){locationPopup.style.display = 'block'}
    return (
        <Link to="/about">
            <div 
                id="char"
                className= {this.state.blink?"blink":"none"}
            >
            </div>
        </Link>
    )
  }
}
