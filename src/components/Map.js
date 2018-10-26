import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props)
        this.getGoogleMaps = this.getGoogleMaps.bind(this)
        this.addMarkers = this.addMarkers.bind(this)
        this.state = {
            map: {},
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

    addMarkers() {
        let bounds = new window.google.maps.LatLngBounds();
        const {showLocations, locations} = this.props
        const map = this.state.map

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
            if (location.show === true) {

                // Create an onclick event to open an infowindow at each marker.
                // marker.addListener('click', function() {
                //     populateInfoWindow(this, largeInfowindow);
                // });

                marker.setMap(map)
                bounds.extend(marker.position);
                return marker
            } else {
                console.log('in marker being null: ', marker)
                marker.setVisible(false)
                console.log('after marker is set to null: ', marker)
                return null
            }
        })

        //adding map markers
        this.setState({
            markers: markers.filter(marker => marker !== null)
        })

        map.fitBounds(bounds);
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
                markers: state.markers
            }))

            this.addMarkers();

            // This function will loop through the markers array and display them all.
            // function showListings() {
            //     var bounds = new google.maps.LatLngBounds();
            //     // Extend the boundaries of the map for each marker and display the marker
            //     for (var i = 0; i < markers.length; i++) {
            //         markers[i].setMap(map);
            //         bounds.extend(markers[i].position);
            //     }
            //
            //     map.fitBounds(bounds);
            // }
        });
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        //console.log(this.props.locations)
        const shouldUpdate = this.props.locations.some(location => {
            const isMarker = this.state.markers.some(marker => marker.title === location.title)
            //console.log(location.title, ' should not update: ', isMarker === location.show)
            return !(isMarker === location.show)
        })

        if(shouldUpdate) {
            this.addMarkers()
        }

    }

    render() {
        return (
            <div id="map" ref="map"></div>
        )
    }
}

export default Map