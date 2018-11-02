import React, { Component } from 'react';
import List from './components/List';
import Map from './components/Map';
import Nav from './components/Nav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGhost, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faGhost, faBars)

class App extends Component {
    constructor(props) {
        super(props)
        this.filterLocations = this.filterLocations.bind(this)
        this.showListToggle = this.showListToggle.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        this.state = {
            showList: true,
            locations: [
                {
                  title: 'Elliott Bay Public House & Brewery',
                  location: {lat: 47.721365, lng: -122.295054},
                  id: '16719622',
                  show: true,
                  ref: React.createRef()
                },
                {
                    title: 'Hellbent Brewing Company',
                    location: {lat: 47.724061, lng: -122.294285},
                    id: '17761627',
                    show: true,
                    ref: React.createRef()
                },
                {
                    title: 'The Beer Authority',
                    location: {lat: 47.721893, lng: -122.292968},
                    id: '17808055',
                    show: true,
                    ref: React.createRef()
                },
                {
                    title: 'Kaffeeklatsch Seattle',
                    location: {lat: 47.720013, lng: -122.295016},
                    id: '16728309',
                    show: true,
                    ref: React.createRef()
                },
                {
                    title: '2CThai Bistro & Spirits',
                    location: {lat: 47.719587, lng: -122.294578},
                    id: '17808059',
                    show: true,
                    ref: React.createRef()
                }
            ]
        }
    }

    filterLocations(filterBy) {
      this.setState(state => ({
          showList: state.showList,
          locations: state.locations.map(location => {
              const words = location.title.toLowerCase().split(' ')
              location.show = words.some(word => word.startsWith(filterBy.toLowerCase()))
              return location
          })
      }))
    }

    showListToggle(override = undefined) {
        if (override === 'hide') { override = false}
        else if (override === 'show') { override = true }

        this.setState(state => ({
            showList: override === undefined? !state.showList : override,
            locations: state.locations
        }))
    }

    onWindowResize = () => {
        window.innerWidth < 600?
            this.showListToggle('hide')
        :
            this.showListToggle('show')

    }

    componentDidMount() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }

  render() {
    const { locations, showList } = this.state
    let showLocations = this.state.locations.filter(location => (location.show === true))

    return (
      <div className="App">
        <List locations={showLocations}
              filterLocations={this.filterLocations}
              showList={showList}
              showListToggle={this.showListToggle}
        />

        <div className="map-container">
          <Nav showListToggle={this.showListToggle}/>
          <Map locations={locations} showLocations={showLocations} />
        </div>
      </div>
    );
  }
}

export default App;
