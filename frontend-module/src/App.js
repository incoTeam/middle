import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./views/Main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
