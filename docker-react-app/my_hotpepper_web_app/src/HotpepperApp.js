import React from "react";
import './App.css';

import MyGeolocated from './API/my_Geolocated'; //HACK: 混乱を避けるために絶対パスで指定できるようにする

import { Formik } from "formik";
import InnerForm from "./Form/InnerSearchForm";
import SearchCondition from "./Form/SearchCondition";

import HotpepperApi from "./API/Hotpepper";
import XMLParser from 'react-xml-parser';


import StoreDetail from './StoreDetail';

class HotpepperApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            latm: null,
            lng: null,
            isLoacation: false,

            isAlert: false,
            alertMessage: '',
            
            children: [],
        }        
    }


    setChildren ( xml ) {
        let result = xml.getElementsByTagName('results');
        result = result['0'];
        const children = result['children'];
        console.log("children -> " + children)

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
                <MyGeolocated />                
            
                <Formik                    
                    initialValues={new SearchCondition().toForm()}
                    onSubmit={values => { 
                        // obj に要素追加        
                        values["latm"] = "34.67";
                        values["lng"] = "135.52";        
                        console.log("values -> " + JSON.stringify(values))                                            
                        
                        const params = SearchCondition.fromForm(values).toAPI();
                        const response = HotpepperApi.getNearRestaurant(params);

                        response.then((res) => {
                            const xml = this.str2xml(res.data);                            
                            console.log('xml -> ' + JSON.stringify(xml))
                            this.setChildren(xml);                            
                        }
                        );

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