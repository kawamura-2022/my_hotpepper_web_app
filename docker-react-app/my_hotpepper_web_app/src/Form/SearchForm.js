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


        values["latm"] = "34";
        values["lng"] = "67";

        console.log(values)
                
        const params = SearchCondition.fromForm(values).toAPI();

        // console.log(latm, lng)
        alert(JSON.stringify(params)); // Debug
                
        const my_response = HotpepperApi.getNearRestaurant(params);        

        console.log(my_response)
        console.log('my_response status -> '+my_response.status)
        console.log('call api end!!')
        // alert(process.env.REACT_APP_API_URL_HOTPEPPER);
        // alert(process.env.REACT_APP_API_KEY_HOTPEPPER);
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
  );

export default SearchForm;