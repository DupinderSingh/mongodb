import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Small extends Component{
    render() {
        return (
        <small id={this.props.id}
           className="form-text text-muted">{this.props.text}</small>
        )
    }
}
export default withRouter(connect(null)(Small))