import React, { Component } from 'react';
import ReactQMap from 'react-qmap';

class MapWithGeolocation extends Component {
    state = {
        center: {}
    }
    componentDidMount() {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(this._showPosition, this._showError);
        } else {
            /* geolocation IS NOT available */
            alert('你的浏览器不支持geolocation')
        }
    }
    _showPosition = position => {
        console.log(position.coords);
        this.setState({center: {latitude: position.coords.latitude, longitude: position.coords.longitude}});
        // alert(JSON.stringify({latitude: position.coords.latitude, longitude: position.coords.longitude}));
    }
    _showError = error => {
        console.log(error);
        alert('获取定位异常');
    }
    render() {
        const { center } = this.state;
        return (
            <ReactQMap 
                center={center} 
                mySpot={center}
                initialOptions={{zoomControl: true, mapTypeControl: true}} 
                apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
            />
        )
    }
}

export default MapWithGeolocation;