/*
 * File: LibraryDraw.js
 * Desc: 描述
 * File Created: 2020-06-15 01:36:21
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
import React, { Component } from "react";
import ReactQMap from "react-qmap";

let qMap = {};
class MapWithSpot extends Component {
    _draw = () => {
        const drawingManager = new qMap.drawing.DrawingManager({
            drawingMode: qMap.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: qMap.ControlPosition.TOP_CENTER,
                drawingModes: [
                    qMap.drawing.OverlayType.MARKER,
                    qMap.drawing.OverlayType.CIRCLE,
                    qMap.drawing.OverlayType.POLYGON,
                    qMap.drawing.OverlayType.POLYLINE,
                    qMap.drawing.OverlayType.RECTANGLE,
                ],
            },
            circleOptions: {
                fillColor: new qMap.Color(255, 208, 70, 0.3),
                strokeColor: new qMap.Color(88, 88, 88, 1),
                strokeWeight: 3,
                clickable: false,
            },
        });
        drawingManager.setMap(this.mapIns);
    };

    _getMap = (map, wMap) => {
        this.mapIns = map;
        qMap = wMap;
        this._draw();
    };
    render() {
        return (
            <ReactQMap
                center={{ latitude: 30.53786, longitude: 104.07265 }}
                getMap={(map, wMap) => this._getMap(map, wMap)}
                apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
                libraries={["drawing"]}
            />
        );
    }
}

export default MapWithSpot;
