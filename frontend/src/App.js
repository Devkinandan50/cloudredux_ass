import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './Pages/Home';
import Main from './Pages/Main';
import Signup from './Pages/Signup';
import Login from './Pages/login';

// import dotenv from 'dotenv';
// dotenv.config();

function App() {
  return (
    <>
      
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/main">
                  <Main />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Switch>
            </div>
          </Router>
        
    </>
  );
}

export default App;