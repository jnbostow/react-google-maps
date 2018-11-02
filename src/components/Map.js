import React, { Component } from 'react';
import { createInfoWindowDetails } from "../helpers";
import ReactDOM from "react-dom";

class Map extends Component {
    constructor(props) {
        super(props)
        this.getGoogleMaps = this.getGoogleMaps.bind(this)
        this.updateMarkers = this.updateMarkers.bind(this)
        this.removeMarkers = this.removeMarkers.bind(this)
        this.initMarkers = this.initMarkers.bind(this)
        this.state = {
            map: {},
            infowindow: {},
            markers: []
        }
    }

    getGoogleMaps() {
        // If we haven't already defined the promise, define it
        if (!this.googleMapsPromise) {
            this.googleMapsPromise = new Promise((resolve) => {
                // Load the Google Maps API
                const script = document.createElement("script");
                const API = 'AIzaSyA6EX0L417T41xHdUbbS76EmU95Vmn4pqY';
                script.type = 'text/javascript';
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
                script.async = true;
                document.body.appendChild(script);

                // Add a global handler for when the API finishes loading
                window.resolveGoogleMapsPromise = () => {
                    // Resolve the promise
                    resolve(window.google);

                    // Tidy up
                    delete window.resolveGoogleMapsPromise;
                };

            });
        }

        // Return a promise for the Google Maps API
        return this.googleMapsPromise;
    }

    updateMarkers() {
        const { showLocations } = this.props
        const { map, markers } = this.state

        markers.forEach(marker => {
            showLocations.forEach(location => {
                if(location.title === marker.title) {
                    marker.setMap(map)
                }
            })

        })
    }

    removeMarkers() {
        const { markers } = this.state

        markers.forEach(marker => {
            marker.setMap(null)
        })
    }

    initMarkers() {
        let bounds = new window.google.maps.LatLngBounds();
        const {locations} = this.props
        const map = this.state.map
        const infowindow = new window.google.maps.InfoWindow()

        const markers = locations.map((location, idx) => {
            const position = location.location;
            const title = location.title;
            // Create a marker per location, and put into markers array.
            const marker = new window.google.maps.Marker({
                position: position,
                title: title,
                animation: window.google.maps.Animation.DROP,
                id: idx
            });

            marker.setMap(map)
            bounds.extend(marker.position);

            marker.addListener('click', function() {
                createInfoWindowDetails(map, marker, location, infowindow)
            });

            return marker;
        })


        //adding map markers
        this.setState({
            markers: markers
        })

        //add infowindow to state
        this.setState({
            infowindow: new window.google.maps.InfoWindow(),
        })

        map.fitBounds(bounds);

        locations.forEach(location => {
            ReactDOM.findDOMNode(location.ref.current).addEventListener("click", function() {
                const location = locations.filter(location => location.title === this.innerText)[0]
                const marker = markers.filter(marker => marker.title === this.innerText)[0]

                createInfoWindowDetails(map, marker, location, infowindow)
            })
        })
    }

    componentWillMount() {
        // Start Google Maps API loading since we know we'll soon need it
        this.getGoogleMaps();
    }

    componentDidMount() {
        // Once the Google Maps API has finished loading, initialize the map
        this.getGoogleMaps().then((google) => {
            const home = {lat: 47.718329, lng: -122.300972};
            const map = new google.maps.Map(this.refs.map, {
                zoom: 10,
                center: home
            });
            this.setState(state => ({
                map: map,
                infowindow: state.infowindow,
                markers: state.markers
            }))
            this.initMarkers();
        });
    }

    componentDidUpdate() {
        this.removeMarkers()
        this.updateMarkers()
    }

    render() {
        return (
            <div id="map" ref="map" aria-label="Google Maps" role="application" aria-hidden="true"></div>
        )
    }
}

export default Map