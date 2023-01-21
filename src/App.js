 
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './Login';
import Spinner from './spinner/Spinner';
import MemberInfo from './spinner/MemberInfo';
function App() {
  return (
    <div className="App">
       <BrowserRouter >
       <div>       
          <Routes>
            <Route exact path="/spinner" element={<Spinner />} />
          </Routes>
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route exact path="/memberinfo" element={<MemberInfo />} />
          </Routes>
        </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
