import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl';
import Current from './Current';
import './Map.css';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
          viewport: {
            latitude: 37.47,
            longitude: -97.61,
            zoom: 3.8,
            bearing: 0,
            pitch: 0,
            width: 0,
            height: 0
          }
        };
        this.onScreenChange = this.onScreenChange.bind(this);
        this.viewportChange = this.viewportChange.bind(this);
    }

    static getDerivedStateFromProps(props, prevState) {
        if(props.longitude && props.latitude){
        return {
          viewport:{
              ...prevState.viewport,
              latitude: props.latitude,
              longitude: props.longitude,
              zoom: props.zoom
          }
        }} else {
            return prevState;
        }
    }

    onScreenChange(){
        this.setState(prevState => {
            return {
                viewport:{
                    ...prevState.viewport,
                    width: window.innerWidth,
                    height: window.innerHeight+60
                }
            }
        })
    }

    viewportChange(viewport){
        const {longitude, latitude, zoom} = viewport;
        this.props.changeMapLoc(latitude, longitude, zoom);
        this.setState({
            viewport: {
                ...viewport
            }
        })
    }

    componentDidMount(){
        this.onScreenChange();
        window.addEventListener("resize", this.onScreenChange);
    }

    render() {
        const {viewport} = this.state;
        const {apiKey} = this.props;
        return (
            <div>
                <div id="vignette"></div>
                <Current 
                    location={this.state.viewport}
                    display={this.props.showLocation}
                />
                <div id="map">
                    <ReactMapGL
                        {...viewport}
                        mapStyle= 'mapbox://styles/xarlze/cjtogb5093s101fnbiehafg9n'
                        mapboxApiAccessToken={apiKey}
                        onViewportChange={(viewport) => this.viewportChange(viewport)}
                    />
                </div>
            </div>
        )
    }
}
