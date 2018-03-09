import React, { Component } from 'react';
import ReactQMap from 'react-qmap';

class BasicMap extends Component {
    render() {
        return (
            <ReactQMap 
                center={{latitude: 30.53786, longitude: 104.07265}} 
                initialOptions={{zoomControl: true, mapTypeControl: true}} 
                apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
            />
        )
    }
}

export default BasicMap;