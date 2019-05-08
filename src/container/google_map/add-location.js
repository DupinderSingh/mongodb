import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import Input from "../../components/input";
import Small from "../../components/small";
import Button from "../../components/button";
import {checkValidation} from "../../actions/app";
import {changeAddress, clearAddLocationOldData} from '../../actions/add-location';
// import addLocationReducer from "../../reducers/dummy";
import axios from "axios";

class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ""
        }
    }
    componentWillMount() {
        this.props.dispatch(clearAddLocationOldData())
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.address, "new address......");
    }
    putDataToDB = addr => {
        const self = this.props;
        console.log(addr, "old.....");
        let address = addr;
        address = address.trim(" "); // replace outer spaces with ""
        address = address.replace(/  +/g, '+'); // replace all in between space with single space
        console.log(address, "latest address array...");
        if (address !== "" && address !== "+") {
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCqlzdmRasNAVLVYfUb26BiOjkSvny4YHQ')
                .then(function (response) {
                    if (response.data.results.length > 0) {
                        axios.post("http://localhost:3002/api/addAddress", {
                            address: response.data.results[0]["formatted_address"],
                            long: response.data.results[0]["geometry"]["location"]["lng"],
                            lat: response.data.results[0]["geometry"]["location"]["lat"]
                        });
                        window.setTimeout(()=> {
                            self.history.push("/google-map");
                        }, 4000)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    onSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) {
            // hit the api....
            this.putDataToDB(this.state.address);
        }
        else {
            // show the error...
            document.getElementById("add_location").parentElement.classList.add("has-error");
        }
    }

    onChange(e) {
        // called when onchange event fired...
        const target = e.target;
        checkValidation(e);
        console.log(this.props, "this.props...")
        console.log(this.props.addr, "this.props.addr");
        this.setState({
            address: e.target.value
        });
        const newState = Object.assign(this.props.addr, {
            [e.target.name]: e.target.value
        });
        this.props.dispatch(changeAddress(newState));
    }
    render() {
        return (
            // code to  add locations on mongo.....
                <div className="container-fluid">
                     <form onSubmit={this.onSubmit.bind(this)} noValidate={true}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter Your Address</label>
                            <input type={"text"}
                                   name={"address"}
                                   required={true}
                                   value={this.state.address}
                                   onChange={this.onChange.bind(this)}
                                   className="form-control"
                                   id="add_location"
                                   placeholder={"Enter your Address"}/>


                            {/*<Input type="text"*/}
                            {/*       name="address"*/}
                            {/*       required={true}*/}
                            {/*       onChange={this.onChange.bind(this)}*/}
                            {/*       value={this.props.state.addLocationReducer.address}*/}
                            {/*       id="add_location"*/}
                            {/*       placeholder="Enter your Address"/>*/}
                            <p className="with-error">Please enter your Address.</p>
                            <Small id="emailHelp"
                                   text="Please enter your current location address."/>
                        </div>
                        <Button type="submit" text="Submit"/>
                    </form>
                </div>
        )
    }
}
function mapStateToProps(state) {
    const {addr} = state.addLocationReducer;
    const {address} = addr;
    return {addr, address, state}
};
export default withRouter(connect(mapStateToProps)(AddLocation))