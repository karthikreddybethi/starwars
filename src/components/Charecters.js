import { useState, useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  Box,
} from "@material-ui/core";

//Components
import CharecterExtraDetails from "./CharecterExtraDetails";
import { WebDataContext } from "../globalData/GlobalData";

function Charecters({ name, gender, birthYear, extraDetails }) {
  const [expanded, setExpanded] = useState(false);
  const { selectMovie } = useContext(WebDataContext);

  const handleCollapse = () => {
    setExpanded((prev) => {
      return !prev;
    });
  };

  return (
    <Box pb="1rem">
      <Card style={{ padding: "1rem 0.5rem 1rem 0.5rem", widt: "100%" }}>
        <CardContent>
          <Typography variant="h5">
            {selectMovie ? `Film Name: ${name}` : `Name: ${name}`}
          </Typography>

          <Typography variant="h5">
            {selectMovie ? null : `Gender: ${gender}`}
          </Typography>
          <Typography variant="h5">
            {selectMovie ? null : `Date of Birth: ${birthYear}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleCollapse} variant="outlined" color="primary">
            More Details
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CharecterExtraDetails extraDetails={extraDetails} />
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}

export default Charecters;
