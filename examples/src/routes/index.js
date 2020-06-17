import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import BasicMap from '../components/maps/BasicMap';
import MapWithSpot from '../components/maps/MapWithSpot';
import MapWithMarker from '../components/maps/MapWithMarker';
import MapWithGeolocation from '../components/maps/MapWithGeolocation';
import LibraryDraw from "../components/maps/LibraryDraw";

class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/basic" component={BasicMap} />
                    <Route exact path="/spot" component={MapWithSpot} />
                    <Route exact path="/marker" component={MapWithMarker} />
                    <Route exact path="/geolocation" component={MapWithGeolocation} />
                    <Route exact path="/drawing" component={LibraryDraw} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;