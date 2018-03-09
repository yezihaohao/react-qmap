import React, { Component } from 'react';
import ReactQMap from 'react-qmap';

let classMap, windowMap;
class MapWithSpot extends Component {
    _setMarker = () => {
        const marker = new windowMap.Marker({
          map: classMap,
          position: new windowMap.LatLng(30.53786, 104.07265),
          animation: windowMap.MarkerAnimation.DROP,
        });
        console.log(marker);
      }
      _getMap = (map, wMap) => {
        classMap = map;
        windowMap = wMap;
        this._setMarker();
      }
    render() {
        return (
            <ReactQMap 
                center={{latitude: 30.53786, longitude: 104.07265}} 
                getMap={(map, wMap) => this._getMap(map, wMap)}
                apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
            />
        )
    }
}

export default MapWithSpot;