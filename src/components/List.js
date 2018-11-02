import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            value: ''
        }
    }

    handleChange(event) {
        const value = event.target.value
        const { filterLocations } = this.props

        filterLocations(value)
        this.setState({value: value})
    }

    render() {
        const { locations, showList, showListToggle } = this.props

        return (
            <div id="list" className={showList? 'show' : 'hide'} role="menu">
                <h1>Lake City <span className="header-sub">Favorite Food & Lounge</span></h1>
                <input placeholder="  enter filter"
                       type="text"
                       value={this.state.value}
                       onChange={this.handleChange}
                       aria-label="filter"
                />

                <ul>
                    {locations.map((location, idx) => (
                        <li key={idx} ref={location.ref}
                            onClick={()=> {window.innerWidth < 600 && showListToggle('hide')}}
                            tabIndex="0"
                        >
                            {location.title}

                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default List