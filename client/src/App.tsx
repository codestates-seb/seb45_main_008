import "./App.css";
import MainPage from "./page/MainPage";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
