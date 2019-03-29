import React, { Component } from 'react'
import './Animation.css'

let colorPalette = {
    Clear: {
        main:"rgba(135,189,235",
        other:"white"
    },
    Unclear: {
        main:"rgba(174, 189, 191",
        other:"white"
    },
    Sandy:{
        main: "rgba(241, 215, 181",
        other:"white"
    },
    Mist:{
        main:"rgba(245, 245, 245",
        other:"black"
    },
    Dust: {
        main:"rgba(155, 155, 155",
        other:"white"
    }
}

export default class Animation extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true

        }
    }
    static getDerivedStateFromProps(props){
        if(props.data.loadSun){
            return {
                isLoading: false
            }
        }else{
            return {
                isLoading: true
            }
        }
    }
    render() {
        if(!this.state.isLoading){
            const {skyCondition} = this.props.data;
            let colorRef;
            let otherCondition;
            switch(skyCondition){
                case 'Clear':
                otherCondition = '';
                case 'Clouds':
                otherCondition = 'clouds';
                case 'Drizzle':
                otherCondition = 'drizzle';
                case 'Snow':
                otherCondition = 'snow';
                case 'Tornado':
                otherCondition = 'tornado';
                colorRef = 'Clear';
                break;
                case 'Thuunderstorm':
                case 'Rain':
                case 'Squall':
                colorRef = 'Unclear';
                break;
                case 'Sand':
                colorRef = 'Sandy';
                break;
                case 'Mist':
                case 'Haze':
                case 'Fog':
                colorRef = 'Mist';
                break;
                case 'Smoke':
                case 'Ash':
                case 'Dust':
                colorRef = 'Dust';
                break;
            }
            let rise = new Date(this.props.data.sunrise*1000);
            let riseHour = "0" + rise.getHours();
            let riseMinute = "0" + rise.getMinutes();
            let riseFormatted = riseHour.substr(-2) + ':' + riseMinute.substr(-2);
            let set= new Date(this.props.data.sunset*1000);
            let setHour = "0" + set.getHours();
            let setMinute = "0" + set.getMinutes();
            let setFormatted = setHour.substr(-2) + ':' + setMinute.substr(-2);
            let now = new Date();
            let percentNow = Math.round((now.getHours()*60+now.getMinutes())/1440*100);
            let percentToRise = Math.round((rise.getHours()*60+rise.getMinutes())/1440*100);
            let percentToSet = Math.round(100-(set.getHours()*60+set.getMinutes())/1440*100);
            setTimeout(()=>{
                let riseDiv = document.querySelector("#sunrise");
                if(riseDiv){riseDiv.style.animationPlayState = 'paused';}
            },(4300*(percentToRise/130)+600))
            setTimeout(()=>{
                let setDiv = document.querySelector("#sunset");
                if(setDiv){setDiv.style.animationPlayState = 'paused';}
            },(4300*(percentToSet/140)+1090))
            setTimeout(()=>{
                let sunDiv = document.querySelector("#sunContainer");
                if(sunDiv){sunDiv.style.animationPlayState = 'paused';}
            },(4300*(percentNow/130)+1300))
            let changeColor = document.querySelectorAll(".weatherDivs>*,.weatherDivs>*>*")
            changeColor.forEach(target=>{
                target.style.backgroundColor = `${colorPalette[colorRef].main},1)`
                target.style.borderColor = `${colorPalette[colorRef].other}`
                target.style.color= `${colorPalette[colorRef].other}`
            })
            return (
                <div
                    id="animation"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${colorPalette[colorRef].main},0), ${colorPalette[colorRef].main},0.1), ${colorPalette[colorRef].main},0.9), ${colorPalette[colorRef].main},1), ${colorPalette[colorRef].main},1))`
                    }}
                >
                <div 
                    id="sunBar"
                    style={{
                        borderTopColor:`${colorPalette[colorRef].other}`
                    }}
                >
                    <div
                        id="sunrise"
                        style={{
                            color:`${colorPalette[colorRef].other}`
                        }}
                    >
                        <span>sunrise</span>
                        <br/>
                        <span className="time">{riseFormatted}</span>
                    </div>
                    <div 
                        id="sunset"
                        style={{
                            color:`${colorPalette[colorRef].other}`
                        }}
                    >
                        sunset
                        <br/>
                        <span className="time">{setFormatted}</span>
                    </div>
                </div>
                <div id="sunContainer"><img id="sun" src={require('../images/sun.png')} /></div>
            </div>
            )
        } else {
            let weatherDivs = document.querySelectorAll(".weatherDivs>*,.weatherDivs>*>*")
            weatherDivs.forEach(weatherDiv=>{
                weatherDiv.style.backgroundColor = "white"
                weatherDiv.style.borderColor = "black"
                weatherDiv.style.color= "black"
            })
            return(null)
        }
    }
}
