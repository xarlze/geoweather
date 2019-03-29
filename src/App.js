import React, { Component } from 'react';
import Weather from './component/Weather';
import Map from './component/Map';
import Animation from './component/Animation';
import { Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import dotenv from 'dotenv';
import './App.css';

dotenv.config();
const googleKey = process.env.REACT_APP_GEO_API_KEY;
const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;
const mapboxKey = process.env.REACT_APP_MAPBOX_API_KEY;
const autoZoom = 13;

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      searchKeyword:{
        zipSearch: false,
        mapSearch: false,
        citySearch: false
      },
      light: '',
      zip: '',
      skyCondition:'',
      sunrise:'',
      sunset:'',
      loadSun: false,
      userLocation: {
        latitude:'',
        longitude:'',
        zoom: ''
      },
      showLocation: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.invalidState = this.invalidState.bind(this);
    this.clearState = this.clearState.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.getZip = this.getZip.bind(this);
    this.getTime = this.getTime.bind(this);
    this.moveMap = this.moveMap.bind(this);
    this.getApi = this.getApi.bind(this);
    this.getCityApi = this.getCityApi.bind(this);
    this.getCoorApi = this.getCoorApi.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.loading= this.loading.bind(this);
    this.displayLocation = this.displayLocation.bind(this);
  }

  loading(){
    this.setState({
      main: "···",
      temp: "···",
      name: "···",
      humid: "···",
      windSpeed: "···",
      zip: "···",
      loadSun: false
    })
  }

  displayLocation(){
    setTimeout(()=>{
      if(this.state.showLocation){
        this.setState({
          showLocation:false,
        })
      }
    },100)
  }
  
  handleChange(value){
    if(!isNaN(parseInt(value)) && (value.toString().length === 5)){
      this.setState(prevState=>{
        return{
          searchKeyword:{
            ...prevState.searchKeyword,
            citySearch: false,
            zipSearch: true
          },
          zip: value,
          loadSun: false
        }
      })
    }else if(isNaN(parseInt(value)) && (value.toString().length !== 0)){
      this.setState(prevState=>{
        return{
          searchKeyword:{
            ...prevState.searchKeyword,
            citySearch: true,
            zipSearch: false
          },
          zip: value,
          loadSun: false
        }
      })
    }else{
      this.setState(prevState=>{
        return{
          searchKeyword:{
            ...prevState.searchKeyword,
            citySearch: false,
            zipSearch: false
          },
          zip: value,
          loadSun: false
        }
      })
    }
  }

  toggleSearch(name){
    this.setState(prevState=>{
      return{
      searchKeyword:{
        ...prevState.searchKeyword,
        [name]: ![prevState[name]]
      }
    }})
  }

  getTime(){
    let currTime = new Date();
    let currHour = currTime.getHours()
    let bright;
    if(currHour<5){
      bright = "night";
    }else if(currHour<9){
      bright = "sunrise";
    }else if(currHour<16){
      bright = "day";
    }else if(currHour<19){
      bright = "sunset";
    }else{
      bright = "night";
    }
    this.setState({
      light: bright
    })
  }

  invalidState(){
    this.setState({
      main: '',
      temp: '',
      name: '',
      humid: '',
      windSpeed: '',
      zip:'enter a zip',
      loadSun: false
    })
  }

  clearState(){
    this.setState({
      main: '',
      temp: '',
      name: '',
      humid: '',
      windSpeed: '',
      zip:'',
      loadSun: false
    })
  }

  getCoorApi(){
    this.loading();
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.userLocation.latitude}&lon=${this.state.userLocation.longitude}&units=imperial&appid=${weatherKey}`)
        .then(response=> response.json())
        .then(json => {
            this.setState(prevState=>{return {
                skyCondition: json.weather[0].main,
                main: json.weather[0].description,
                temp: json.main.temp,
                name: json.name,
                humid: json.main.humidity,
                windSpeed: json.wind.speed,
                zip: (json.name?json.name:"Unknown"),
                sunrise: json.sys.sunrise,
                sunset: json.sys.sunset,
                userLocation:{
                    ...prevState.userLocation,
                    zoom: autoZoom
                },
                showLocation:true,
                loadSun: true
            }})
            setTimeout(()=>{
              this.setState({
                searchKeyword:{
                  zipSearch:false,
                  mapSearch:false,
                  citySearch:false
                }
              })
            },100)
            this.displayLocation()
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            zip: "Invalid"
          })
        });
  }

  getCityApi(zip){
    this.loading();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zip},us&units=imperial&appid=${weatherKey}`)
        .then(response=> response.json())
        .then(json => {
            this.setState({
                skyCondition: json.weather[0].main,
                main: json.weather[0].description,
                temp: json.main.temp,
                name: json.name,
                humid: json.main.humidity,
                windSpeed: json.wind.speed,
                zip: json.name,
                sunrise: json.sys.sunrise,
                sunset: json.sys.sunset,
                userLocation:{
                    latitude: json.coord.lat,
                    longitude: json.coord.lon,
                    zoom: (autoZoom-2)
                },
                showLocation:true,
                loadSun: true
            })
            setTimeout(()=>{
              this.setState({
                searchKeyword:{
                  zipSearch:false,
                  mapSearch:false,
                  citySearch:false
                }
              })
            },100)
            this.displayLocation()
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            zip: "Invalid"
          })
        });
  }

  getApi(zip){
    this.loading();
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${weatherKey}`)
        .then(response=> response.json())
        .then(json => {
            this.setState({
                skyCondition: json.weather[0].main,
                main: json.weather[0].description,
                temp: json.main.temp,
                name: json.name,
                humid: json.main.humidity,
                windSpeed: json.wind.speed,
                zip: json.name,
                sunrise: json.sys.sunrise,
                sunset: json.sys.sunset,
                userLocation:{
                    latitude: json.coord.lat,
                    longitude: json.coord.lon,
                    zoom: autoZoom
                },
                showLocation:true,
                loadSun: true
            })
            setTimeout(()=>{
              this.setState({
                searchKeyword:{
                  zipSearch:false,
                  mapSearch:false,
                  citySearch:false
                }
              })
            },100)
            this.displayLocation()
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            zip: "Invalid"
          })
        });
  }

  getZip(){
    this.loading();
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.userLocation.latitude},${this.state.userLocation.longitude}&key=${googleKey}`)
        .then(response=>response.json())
        .then(json => {
          if(json.status==="OK"&&json.results[0].address_components[7]){
            this.getApi(json.results[0].address_components[7].short_name)
          }else{
            console.error("Invalid")
          }
        })
  }

  showPosition(position) {
    this.setState({
      userLocation:{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: autoZoom
      }
    });
    this.getCoorApi();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  componentDidMount(){
    this.getLocation();
    this.getTime();
  }

  moveMap(latitude,longitude,zoom){
    this.setState(prevState=>{
      return{
        searchKeyword:{
          ...prevState.searchKeyword,
          mapSearch: true
        },
        userLocation:{
          latitude,
          longitude,
          zoom
        },
        showLocation: true,
        loadSun: false
      }
    })
    this.displayLocation()
  }

  render() {
    return (
      <div>
        <Animation
          data={this.state}
        />
        <Map
          apiKey={mapboxKey}
          longitude={this.state.userLocation.longitude}
          latitude={this.state.userLocation.latitude}
          zoom={this.state.userLocation.zoom}
          changeMapLoc={this.moveMap}
          showLocation={this.state.showLocation}
        />
        <Weather 
          data={this.state}
          getApi={this.getApi}
          getCityApi={this.getCityApi}
          getCoorApi={this.getCoorApi}
          invalidState={this.invalidState}
          handleChange={this.handleChange}
          clearState={this.clearState}
          getZip={this.getZip}
          toggleSearch={this.toggleSearch}
        />
        <Route 
          exact path="/"
          component={Home}
        />
        <Route 
          path="/about"
          component={About}
        />
      </div>
    )
  }
}

export default App;
