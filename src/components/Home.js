import { useEffect, useRef, useContext } from "react";
import {
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { motion } from "framer-motion";
import useApiHook from "../customHooks/useApiHook";
import useObserverHook from "../customHooks/useObserverHook";
import { WebDataContext } from "../globalData/GlobalData";
import Lottie from "react-lottie";

//Components
import Charecters from "./Charecters";
import starwars from "../assets/starwars.json";
import actorsLoader from "../assets/actorsLoader.json";

function Home() {
  const {
    charectersdata,
    setCharectersData,
    showLoader,
    nextFive,
    filterUrl,
    selectMovie,
  } = useContext(WebDataContext);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  //refs
  const loader = useRef(null);

  //Custom Hooks
  const { apiData } = useApiHook();
  const [inView] = useObserverHook(charectersdata, loader);

  //Function to load next five charecters
  function loadNextCharecters() {
    let newArr = nextFive.splice(0, 5);
    setCharectersData((prev) => {
      return [...prev, ...newArr];
    });
  }

  //Fetching Data
  useEffect(() => {
    apiData("http://swapi.dev/api/people/", "initial");
  }, []);

  //Function to load next five charecters when api function called
  useEffect(() => {
    loadNextCharecters();
  }, [nextFive]);

  //Observer effect to watch the loader component for loading next five charecters sc
  useEffect(() => {
    if (inView) {
      if (nextFive.length === 0) {
        apiData(filterUrl);
      } else {
        loadNextCharecters();
      }
    }
  }, [inView]);

  //Animations

  //Lottie animations for loaders
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: starwars,
  };

  const actorsLoaderOptions = {
    autoplay: true,
    loop: true,
    animationData: actorsLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //Framer motions animations to slide in actors details
  const slideIn = {
    initial: {
      x: "-100vw",
    },
    animate: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
  };

  const childrenSlideIn = {
    initial: {
      x: "-100vw",
    },
    animate: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
  };

  return (
    <Container xs={12}>
      <main>
        <Box pt="4rem">
          {charectersdata.length > 0 ? (
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={motion.div}
                variants={slideIn}
                initial="initial"
                animate="animate"
              >
                {selectMovie
                  ? charectersdata.map((charecterDetails, index) => {
                      return (
                        <Box
                          key={index}
                          component={motion.div}
                          variants={childrenSlideIn}
                          initial="initial"
                          animate="animate"
                        >
                          <Charecters
                            key={index}
                            name={charecterDetails.title}
                            extraDetails={{
                              films: charecterDetails.characters,
                            }}
                          />
                        </Box>
                      );
                    })
                  : charectersdata.map((charecterDetails, index) => {
                      return (
                        <Box
                          key={index}
                          component={motion.div}
                          variants={childrenSlideIn}
                          initial="initial"
                          animate="animate"
                        >
                          <Charecters
                            key={index}
                            name={charecterDetails.name}
                            gender={charecterDetails.gender}
                            birthYear={charecterDetails.birth_year}
                            extraDetails={{
                              height: charecterDetails.height,
                              birthYear: charecterDetails.birth_year,
                              films: charecterDetails.films,
                            }}
                          />
                        </Box>
                      );
                    })}
              </Grid>
              {showLoader && (
                <Grid item>
                  <Box ref={loader}>
                    <Lottie
                      options={actorsLoaderOptions}
                      height={200}
                      width={matches ? 400 : "100%"}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          ) : (
            <Box width="100%" height="70vh">
              <Lottie options={defaultOptions} />
            </Box>
          )}
        </Box>
      </main>
    </Container>
  );
}

export default Home;
