import { Box, makeStyles, AppBar, Toolbar } from "@material-ui/core";

//Components
import SearchBox from "../components/SearchBox";

//Images
import starwarsLogo from "../assets/star-wars-4.svg";

//Stylings
const useStyles = makeStyles((theme) => ({
  appBarStyling: {
    background: "black",
    padding: "1.5rem 0 0 0",
  },
  logoStyling: {
    [theme.breakpoints.up("xs")]: {
      width: "30%",
      marginRight: "auto",
    },

    [theme.breakpoints.up("md")]: {
      width: "10%",
    },
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <Box overflow="hidden">
      <AppBar className={classes.appBarStyling} position="static">
        <Toolbar>
          <Box className={classes.logoStyling}>
            <img src={starwarsLogo} alt="logo" width="100%" />
          </Box>
          <SearchBox />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
