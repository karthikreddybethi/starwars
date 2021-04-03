//Libraries
import { CssBaseline, ThemeProvider } from "@material-ui/core";

//Components
import Home from "./components/Home";
import Header from "./components/Header";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Header />
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
