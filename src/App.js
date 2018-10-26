import React, { Component } from 'react';
import List from './components/List';
import Map from './components/Map';

class App extends Component {
    constructor(props) {
        super(props)
        this.filterLocations = this.filterLocations.bind(this)
        this.state = {
            locations: [
                {
                  title: 'Elliott Bay Public House & Brewery',
                  location: {lat: 47.721365, lng: -122.295054},
                  show: true
                },
                {
                    title: 'Hellbent Brewing Company',
                    location: {lat: 47.724061, lng: -122.294285},
                    show: true
                },
                {
                    title: 'Korochka Tavern',
                    location: {lat: 47.718701, lng: -122.294935},
                    show: true
                },
                {
                    title: 'Kaffeeklatsch Seattle',
                    location: {lat: 47.720013, lng: -122.295016},
                    show: true
                },
                {
                    title: '2CThai Bistro & Spirits',
                    location: {lat: 47.719587, lng: -122.294578},
                    show: true
                }
            ]
        }
    }

    filterLocations(filterBy) {
      this.setState(state => ({
          locations: state.locations.map(location => {
              //const words = location.title.split(' ')
              location.show = location.title.toLowerCase().includes(filterBy.toLowerCase())
              return location
          })
      }))
    }

  render() {
      const { locations } = this.state
    let showLocations = this.state.locations.filter(location => (location.show === true))
console.log('showLocation Var: ', showLocations)
    return (
      <div className="App">
        <List locations={showLocations} filterLocations={this.filterLocations} />
        <Map locations={locations} showLocations={showLocations}/>
      </div>
    );
  }
}

export default App;
