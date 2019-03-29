import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './HomeNav.css';

export default class AboutNav extends Component {
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
    if(locationPopup){locationPopup.style.display = 'none'}
    return (
        <div id="homeAll">
            <div id="aboutDiv">
                <img id="profilepic" src={require('../images/profile.jpg')}></img>
                <div id="description">
                    <div id="created">Created by <br /> Charles Cui</div>
                    <a href="#" id="georepo">GeoWeather <br/>Repository</a><br/>
                    <a href="#" id="otherwork">Other work</a>
                    <div id="credit">Created with <br/>Mapbox & OpenWeatherMap</div>
                </div>
            </div>
            <Link to="/">
                <div 
                    id="char"
                    className= {this.state.blink?"blink":"none"}
                >
                </div>
            </Link>
        </div>
    )
  }
}
