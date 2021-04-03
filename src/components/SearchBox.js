import {
  Box,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  TextField,
} from "@material-ui/core";

import { motion } from "framer-motion";
import { useState, useContext } from "react";

//Custom Hooks
import useApiHook from "../customHooks/useApiHook";

//Components
import { WebDataContext } from "../globalData/GlobalData";

const useStyles = makeStyles((theme) => ({
  searchBoxContainer: {
    [theme.breakpoints.up("xs")]: {
      width: "60%",
    },

    [theme.breakpoints.up("md")]: {
      width: "20%",
    },
  },

  optionsStyling: {
    marginRight: "1rem",
    [theme.breakpoints.up("xs")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },

  paper: {
    background: "black",
    border: "2px solid rgba(255,255,255, 0.8)",
    borderRadius: "2px",
    color: "white",
  },
}));

function Header() {
  const classes = useStyles();
  const [select, setSelect] = useState("");
  const [inputValue, setInputValue] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const {
    setCharectersData,
    setNextFive,
    setSelectMovie,
    setLoadNextFiveSearchChar,
    setFilterUrl,
  } = useContext(WebDataContext);

  //Hooks
  const { apiData } = useApiHook();

  const handleChange = (event) => {
    setSelect(event.target.value);
    setShowSearchBar(true);
  };

  const handleInputChange = (event) => {
    if (event.target.value.length > 0) {
      select === "films" ? setSelectMovie(true) : setSelectMovie(false);
      let url = `https://swapi.dev/api/${select}/?search=${event.target.value.toLowerCase()}`;
      setCharectersData([]);
      setNextFive([]);
      setLoadNextFiveSearchChar(true);
      setFilterUrl(url);
      apiData(url, "initial");
    } else {
      setSelectMovie(false);
      setCharectersData([]);
      apiData("https://swapi.dev/api/people", "initial");
    }
  };

  return (
    <Box
      className={classes.searchBoxContainer}
      display="flex"
      justifyContent="space-evenly"
    >
      <FormControl className={classes.optionsStyling}>
        <Select
          id="demo-simple-select"
          value={select}
          onChange={handleChange}
          displayEmpty
          inputProps={{ placeholder: "By" }}
          defaultValue="Any"
          MenuProps={{ classes: { paper: classes.paper } }}
        >
          <MenuItem value="" disabled>
            Search By
          </MenuItem>
          <MenuItem value={"people"}>By Name</MenuItem>
          <MenuItem value={"films"}>By Movie</MenuItem>
        </Select>
      </FormControl>
      {showSearchBar && (
        <Box
          className={classes.searchBarStyling}
          component={motion.div}
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ type: "twin", duration: 0.5 }}
        >
          <TextField
            id="serach-input"
            value={inputValue}
            onChange={handleInputChange}
            className={classes.textFieldStyling}
            placeholder="Search"
          />
        </Box>
      )}
    </Box>
  );
}

export default Header;
