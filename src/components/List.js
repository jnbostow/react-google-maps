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
        const { locations } = this.props

        return (
            <div id="list">
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <ul>
                    {locations.map((location, idx) => (
                        <li key={idx}>{location.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default List