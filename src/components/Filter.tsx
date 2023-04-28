import { useState } from "react";

type filterProps = {
  callBack: Function;
};

const Filter = (props: filterProps) => {
  const [filterPoke, setfilterPoke] = useState("");
  const [onfocus, setOnFocus] = useState(false);

  return (
    <div
      className={
        onfocus ? "filter-wrapper filter-wrapper-active" : "filter-wrapper"
      }
    >
      <input
        className="filter-poke"
        type="text"
        placeholder="Name"
        value={filterPoke}
        onFocus={() => {
          setOnFocus(true);
        }}
        onBlur={() => {
          setOnFocus(false);
        }}
        onChange={(event) => {
          setfilterPoke(event.target.value);
          props.callBack(event.target.value);
        }}
      />{" "}
      <div className="search-button">{"\u2315"}</div>
    </div>
  );
};

export default Filter;
