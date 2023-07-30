import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import {BrowserRouter, Route,Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/register" element={<Register></Register>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
