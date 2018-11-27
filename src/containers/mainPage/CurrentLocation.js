import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import classes from './mainPage.css'

const mapStyles = {
    map: {
        position: 'absolute',
        top: '15%',
        left: '20%',
        display: 'block',
        width: '60%',
        height: '60%',
        margin:'0 auto'
    }
};

export class CurrentLocation extends React.Component {

    constructor(props) {
        super(props);
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            location : {}
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }
    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );
            this.map = new maps.Map(node, mapConfig);
        }
    }
    renderChildren() {

        const { children } = this.props;
        if (!children) return;
        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    saveLocation(){

        const current = this.state.currentLocation;
        try{
            const response =  axios.post('https://do-it-1d53f.firebaseio.com/do-it.json', current);
            let token ='';
            response.then(function(result) {
                token = result['data']['name'];
                alert('Location was saved successfully!\n' +
                    'Your secure token is '+ token);
            });
        }catch (e) {
            alert('Something is wrong!');
        }
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}

                <button  role='button' onClick={this.saveLocation.bind(this)}
                className={classes.buttonStyle}>
                    Save Location
                </button>
            </div>
        );
    }

}
export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: -1.2884,
        lng: 36.8233
    },
    centerAroundCurrentLocation: false,
    visible: true
};