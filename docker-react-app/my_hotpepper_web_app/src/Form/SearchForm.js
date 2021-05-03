import React from "react";

import { Formik } from "formik";
import InnerForm from "./InnerSearchForm";
import SearchCondition from "./SearchCondition";

import { geoPropTypes } from "react-geolocated";

import HotpepperApi from "../API/Hotpepper";

const SearchForm = () => (          
    <Formik      
      initialValues={new SearchCondition().toForm()}
      onSubmit={values => { 
        // obj に要素追加
        // TODO サードパーティのrecords の抜き出し方を確認し，修正(https://www.npmjs.com/package/react-geolocated)        
        // values["latm"] = geoPropTypes.coords.latitude;
        // values["lng"] = geoPropTypes.coords.longitude;                
        console.log('debug geoPropTypes -> ')
        console.log(geoPropTypes.coords.latitude)
        console.log(geoPropTypes.coords.longitude)        

        values["latm"] = "34.67";
        values["lng"] = "135.52";        
        console.log("values -> ",values)
          
        const params = SearchCondition.fromForm(values).toAPI();    
        // alert(JSON.stringify(params)); // Debug

        const response = HotpepperApi.getNearRestaurant(params);        
        response.then((res) => {
          console.log('respose data -> ',res.data)          
          }
        );

      }}
      render={({ values, handleSubmit, handleChange }) => (
        <div>
          <InnerForm
            values={values}
            range_candidates = {SearchCondition.get_rangeCandidates()}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />   
        </div>                                     
      )}      
    />
  );

export default SearchForm;