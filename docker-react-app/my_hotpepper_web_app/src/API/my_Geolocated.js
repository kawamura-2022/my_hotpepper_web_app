import React from "react";
import { geolocated  } from "react-geolocated";
// import { geoPropTypes  } from "react-geolocated";

class MyGeolocated extends React.Component {        
    retCords () {
        return this.props.coords;
    }

    render() {
        console.log('start MyGeolocated render')
        return !this.props.isGeolocationAvailable ? (
            <div>ブラウザが Geolocation に対応していません</div>
        ) : !this.props.isGeolocationEnabled ? (                        
            <div>Geolocation が利用できません</div>
        ) : this.props.coords ? (            
            <div> 現在地を取得しました</div>            
        ) : (
            <div>Getting the location data...&hellip; </div>
        );
    }
}

// MyGeolocated.propTypes = Object.assign({}, MyGeolocated.propTypes, geoPropTypes);

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(MyGeolocated);