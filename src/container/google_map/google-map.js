import React, {Component} from "react";
import GoogleMaps from "simple-react-google-maps"
import {Link} from 'react-router-dom';
import axios from "axios";

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: {lat: 0, lng: 0},
            points: []
        }
    }
    componentWillMount() {
        const thi = this;
        axios.get('http://localhost:3002/api/getAddress')
            .then(function (response) {
                if (response.data.data.length > 0) {
                    const data = response.data.data;
                    let points = [];
                    let point = {lng: data[0]["long"], lat: data[0]["lat"]};
                    for (let i in data) {
                        points.push({lng: data[i]["long"], lat: data[i]["lat"]})
                    }
                    thi.setState({
                        point,
                        points
                    });
                    console.log(thi.state.point, "point", thi.state.points, "points")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                {
                    this.state.points.length > 0 && (
                        <GoogleMaps
                            apiKey="AIzaSyCqlzdmRasNAVLVYfUb26BiOjkSvny4YHQ"
                            style={{height: "400px", width: "100%"}}
                            zoom={6}
                            center={this.state.point}
                            markers={this.state.points}
                        />
                    )
                }
                {
                    this.state.points.length === 0 && (
                        <h1>NO LOCATION FOUND PLEASE ADD ATLEAST <Link to="/add-location">ONE LOCATION</Link></h1>
                    )
                }

            </div>
        )
    }
}

export default GoogleMap;
