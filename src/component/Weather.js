import React, { Component } from 'react'
import Main from './Main';
import Temp from './Temp.js';
import Zip from './Zip.js'
import Num from './Num';

export default class Weather extends Component {
  render() {
    const { searchKeyword: { zipSearch, mapSearch, citySearch }, zip, main, temp, windSpeed, humid } = this.props.data;
    return (
        <div className="weatherDivs">
            <div className="flex">
            <div>
              Search by...
            </div>
            </div>
            <br />
            <div className="flexBut">
              <button 
                  name="mapSearch"
                  onClick={e=>{
                    this.props.toggleSearch(e.target.name);
                    this.props.getCoorApi();
                  }}
                  className="mapSearchButton"
                  id={mapSearch?"searchable":"none"}
                  > 
                   Map
              </button>
              <button 
                  name="zipSearch"
                  onClick={e=>{
                    this.props.toggleSearch(e.target.name);
                    !isNaN(parseInt(zip)) && (zip.toString().length === 5) ? this.props.getApi(zip):this.props.invalidState()
                  }}
                  className="zipSearchButton"
                  id={zipSearch?"searchable":"none"}
                  >
                  Zip
              </button>
              <button 
                  name="citySearch"
                  onClick={e=>{
                    this.props.toggleSearch(e.target.name);
                    this.props.getCityApi(zip)
                  }}
                  className="citySearchButton"
                  id={citySearch?"searchable":"none"}
                  >
                  City
              </button>
            </div>
            <br />
            <div className="flex">
              <span>Now</span>
              <Zip
                  zip={zip}
                  changeFunc={value=>this.props.handleChange(value)}
                  clickFunc={() => this.props.clearState()}
                  />
              <span> is </span>
              <Main main={main ? main: ''}/>, at  
              <Temp temp={temp ? (isNaN(Math.round((temp-32)*5/9))?"···":Math.round((temp-32)*5/9)): ''}/> ˚C (
              <Temp temp={temp ? (isNaN(Math.round(temp))?"···":Math.round(temp)): ''}/>˚F),
              </div>
            <br />
            <div className="flex">
              <span> with humidity level of </span>
              <Num num={humid ? (isNaN(Math.round(humid))?"···":Math.round(humid)): ''}/>
              <span>and wind speed of </span>
              <Num num={windSpeed ? (isNaN(Math.round(windSpeed*1.609))?"···":Math.round(windSpeed*1.609)): ''}/>kph
              (<Num num={windSpeed ? (isNaN(Math.round(windSpeed))?"···":Math.round(windSpeed)): ''}/>
              <span>mph).</span>
            </div>
        </div>
    )
  }
}
