import "./App.css";
import Search from "./components/Search";
import AddNewIcon from "./components/AddNewIcon";
export const api = "https://figma-plugin.herokuapp.com/";

function App() {
  return (
    <>
      <div className="App">
        <Search />
        <AddNewIcon />
      </div>
    </>
  );
}

export default App;
