import React from "react";
import './App.css';

import Geolocation from 'react-native-geolocation-service';
import XMLParser from 'react-xml-parser';
import { Formik } from "formik";

import InnerForm from "./Form/InnerSearchForm";
import SearchCondition from "./Form/SearchCondition";
import HotpepperApi from "./API/Hotpepper";
import StoreDetail from './StoreDetail';

class HotpepperApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            latm: null,
            lng: null,
            isGeolocation: false,
            isNowGetlocateion: false,

            isAlert: false,
            alertMessage: '',
            
            children: [],
        }    
        this.setLocation = this.setLocation.bind(this)
    }

    setLocation () {
        console.log("start get location...");
        this.setState({
            isNowGetlocateion: true
        });
        Geolocation.getCurrentPosition(
            (position) => {
                console.log("success myGetLocation");
                console.log(position);
                const {latitude, longitude} = position.coords;
                if ((this.state.latm === latitude) && (this.state.lng === longitude)) {
                    console.log('pass update state')
                } else {
                    this.setState({                        
                        latm: latitude,
                        lng: longitude,                        
                        isNowGetlocateion: false,
                    });
                }
            },
            (error) => {                
                console.log(error.code, error.message);
                this.setState({
                    isNowGetlocateion: false,
                });
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );        
        console.log('now state -> ' + JSON.stringify(this.state))                
    }

    GeoRenderContent () {                   
        console.log('start MyGeolocated render')
        return this.state.isNowGetlocateion ? (                        
            <div>Getting the location data...&hellip; </div>
        ) : this.state.latm ? (            
            <div>
                現在地を取得しました (Your location : {this.state.latm}, {this.state.lng})
            </div>                        
        ) : (
            <div>
                現在地未取得です！！<br></br>                
                <button onClick={this.setLocation}>現在地を取得する</button>
            </div>            
        );        
    }

    setChildren ( xml ) {
        let result = xml.getElementsByTagName('results');
        result = result['0'];
        const children = result['children'];
        console.log("children -> " + JSON.stringify(children))

        this.setState({
            children: children
        });

        // alert(JSON.stringify(children));
    }

    str2xml ( xmlText ) {
        var xml = new XMLParser().parseFromString(xmlText);
        return xml;
    }
    
    render (){        
        return (
            <div className="App">
                                
                {this.GeoRenderContent()}                                                            
            
                <Formik                    
                    initialValues={new SearchCondition().toForm()}
                    onSubmit={values => { 
                        if (this.state.latm === null) {
                            alert('現在地を取得してください')
                        } else {
                            values["latm"] = String(this.state.latm);
                            values["lng"] = String(this.state.lng);

                            // 大阪市のある地点での検索結果
                            // values["latm"] = String(34.67);
                            // values["lng"] = String(135.52);
                            
                            console.log("values -> " + JSON.stringify(values))                            
                            const params = SearchCondition.fromForm(values).toAPI();
                            console.log("api params -> " + JSON.stringify(params))                                            
                            const response = HotpepperApi.getNearRestaurant(params);
    
                            response.then((res) => {
                                const xml = this.str2xml(res.data);                            
                                console.log('xml -> ' + JSON.stringify(xml))
                                this.setChildren(xml);                            
                            }
                            );
                        }                        
                    }}
                    render={({ values, handleSubmit, handleChange }) => (
                        <InnerForm
                            values={values}
                            range_candidates = {SearchCondition.get_rangeCandidates()}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                        />                                           
                    )}      
                />
                 
                
                <StoreDetail children={this.state.children} />                
            </div>            
        );
    }
}

export default HotpepperApp;