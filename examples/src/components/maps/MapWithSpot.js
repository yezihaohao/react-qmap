import React, { Component } from 'react';
import ReactQMap from 'react-qmap';

class MapWithSpot extends Component {
    render() {
        return (
            <ReactQMap 
                center={{latitude: 30.53786, longitude: 104.07265}} 
                mySpot={{latitude: 30.53786, longitude: 104.07265}}
                apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
            />
        )
    }
}

export default MapWithSpot;