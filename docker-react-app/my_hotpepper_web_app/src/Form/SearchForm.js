import React from "react";
import { Formik } from "formik";
import InnerForm from "./InnerSearchForm";
import SearchCondition from "./SearchCondition";

const SearchForm = () => (
    <Formik
      initialValues={new SearchCondition().toForm()}
      onSubmit={values => {
        const params = SearchCondition.fromForm(values).toAPI();
        // axios.get(endpoint, {params: params})
        // APIを叩く代わりにalertする
        alert(JSON.stringify(params));
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