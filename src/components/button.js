import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Button extends Component{
    render() {
        return (
            <button type={this.props.type} className="btn btn-primary">{this.props.text}</button>
        )
    }
}
export default withRouter(connect(null)(Button))