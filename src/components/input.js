import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Input extends Component{
    render() {
        return (
            <input type={this.props.type}
                   name={this.props.name}
                   required={this.props.required}
                   value={this.props.value}
                   onChange={this.props.onChange}
                   className="form-control"
                   id={this.props.id}
                   placeholder={this.props.placeholder}/>
        )
    }
}
export default withRouter(connect(null)(Input))