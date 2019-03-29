import React, { Component } from 'react'

export default class Current extends Component {
    render() {
        return (
            <div id="locationIndicator">
                <div id="me"></div>
                <div
                    id="showLocation"
                    className={this.props.display?"display":"nondisplay"}
                >
                    <div id="line"></div>
                    <div id="current">
                        <p>Longitude: {this.props.location.longitude.toString().slice(0,6)}</p>
                        <p>Latitude: {this.props.location.latitude.toString().slice(0,7)}</p>
                    </div>
                </div>
            </div>
        )
    }
}
