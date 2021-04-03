import React, { createContext, useState } from "react";

export const WebDataContext = createContext();

export const DataProvider = (props) => {
  const [charectersdata, setCharectersData] = useState([]);
  const [nextFive, setNextFive] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [selectMovie, setSelectMovie] = useState(false);
  const [loadNextFiveSearchChar, setLoadNextFiveSearchChar] = useState(false);
  const [filterUrl, setFilterUrl] = useState();
  const [pageLoader, setPageLoader] = useState(false);
  const [hidepageLoader, setHidePageLoader] = useState(false);

  return (
    <WebDataContext.Provider
      value={{
        charectersdata: charectersdata,
        setCharectersData: setCharectersData,
        showLoader: showLoader,
        setShowLoader: setShowLoader,
        nextFive: nextFive,
        setNextFive: setNextFive,
        selectMovie: selectMovie,
        setSelectMovie: setSelectMovie,
        loadNextFiveSearchChar: loadNextFiveSearchChar,
        setLoadNextFiveSearchChar: setLoadNextFiveSearchChar,
        filterUrl: filterUrl,
        setFilterUrl: setFilterUrl,
        pageLoader: pageLoader,
        setPageLoader: setPageLoader,
        hidepageLoader: hidepageLoader,
        setHidePageLoader: setHidePageLoader,
      }}
    >
      {props.children}
    </WebDataContext.Provider>
  );
};
