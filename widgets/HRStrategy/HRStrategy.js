import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from '../../constants'
import services from '../../services'

import Plan from '../../components/Plan'

export default class HRStrategy extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillUnmount() {

    }

    componentDidMount() {}

    render() {
        return (
            <Plan/>
        )
    }
}

HRStrategy.defaultProps = {

}

HRStrategy.propTypes = {

}
