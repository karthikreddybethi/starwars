//Libraries
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import Lottie from "react-lottie";

//Images
import starwars from "../assets/starwars.json";
//Components
import { WebDataContext } from "../globalData/GlobalData";

function CharecterExtraDetails({ extraDetails }) {
  const { selectMovie } = useContext(WebDataContext);

  //State Hooks
  const [filmNames, setFilmNames] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    //async function to call api for film Names
    const filmNames = async (url) => {
      setSpinner(true);
      let response = await fetch(url);
      let data = await response.json();
      setSpinner(false);
      setFilmNames((prev) => {
        let details = selectMovie ? data.name : data.title;
        return [...prev, details];
      });
    };

    extraDetails.films.forEach((film) => {
      filmNames(film);
    });
  }, [extraDetails.films, selectMovie]);

  //Age Calculation
  //compared BBY with BC and AD to calculate the age of the each charecter in current years
  let totalAge;
  const calcAge = () => {
    const currentYear = new Date().getFullYear();
    const age = [];
    extraDetails.birthYear.split("").forEach((item) => {
      if (!isNaN(item)) {
        age.push(+item);
      }
    });
    totalAge = currentYear + +age.join("");
  };

  if (selectMovie) {
  } else {
    calcAge();
  }

  //Lottie Animations for while fetching data
  const spinnerOptions = {
    autoplay: true,
    loop: true,
    animationData: starwars,
  };

  return (
    <>
      {spinner ? (
        <Box>
          <Lottie options={spinnerOptions} height={200} width={200} />
        </Box>
      ) : (
        <Box>
          {selectMovie ? null : (
            <Typography variant="h5">Age: {totalAge} Years</Typography>
          )}

          <Typography variant="h5">
            {selectMovie ? null : `Height: ${extraDetails.height}`}
          </Typography>

          <Typography variant="h5">
            {selectMovie ? "Actor Names:" : "Films:"}
          </Typography>

          <List>
            {filmNames.map((film) => {
              return (
                <ListItem>
                  <ListItemText>{film}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
}

export default CharecterExtraDetails;
