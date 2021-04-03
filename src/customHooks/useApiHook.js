import { useContext } from "react";
import { WebDataContext } from "../globalData/GlobalData";

function useApiHook() {
  const {
    setCharectersData,
    setNextFive,
    setFilterUrl,
    setShowLoader,
  } = useContext(WebDataContext);

  const apiData = async (url, desti) => {
    let response = await fetch(url);
    let data = await response.json();

    !data.next ? setShowLoader(false) : setShowLoader(true);

    data.next && setFilterUrl(data.next);

    if (data.results) {
      if (desti === "initial") {
        setCharectersData((prev) => {
          return [...prev, ...data.results];
        });
      } else {
        setNextFive([...data.results]);
      }
    }
  };

  return { apiData };
}

export default useApiHook;
