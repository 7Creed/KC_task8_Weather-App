import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import SavedLocation from "./pages/SavedLocation";
import { WeatherProvider } from "./context/context";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/search-result/:searchValue"
            element={<SearchResult />}
          ></Route>
          {/* <Route
            path="/search-result/:searchValue"
            element={
              <WeatherProvider>
                <SearchResult />
              </WeatherProvider>
            }
          /> */}
          <Route path="/saved-locations" element={<SavedLocation />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
