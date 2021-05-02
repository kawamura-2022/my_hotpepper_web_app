import React from "react";

const range = (i, j) => [...Array(j).keys()].slice(i, j);
const InnerSearchForm =  ({ values, range_candidates, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      {range_candidates.map(c => (
        <div key={`${c.value}`}>
          <input
            type="radio"
            id={c.value}
            name="tgt_range"
            defaultChecked={values.tgt_range === c.value}
            value={c.value}
            onChange={handleChange}
          />
          <label htmlFor={c.value}>{c.label}</label>
        </div>
      ))}
    </div>
    <div>
      <label>参加人数</label>
      <select value={values.party_capacity} name="party_capacity" onChange={handleChange}>
        {/* <option value="0">指定なし</option> */}
        {range(1, 21).map(t => (
          <option key={`${t}`} value={`${t}`}>
            {t}人以上
          </option>
        ))}
      </select>
    </div>
    <input type="submit" value="指定した条件で探す" />
  </form>
);
export default InnerSearchForm;