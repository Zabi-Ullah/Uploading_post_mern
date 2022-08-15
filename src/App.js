import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/home'
import Navbar from './components/navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux'
import store from './Storage/index'
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'
import CreatePost from './components/createPost'
import Private from './components/PrivateRoter/Private'
import Routelink from './components/PrivateRoter/Routelink'
import Edit from './components/Edit'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
          <Switch>
            
            <Route exact active path="/home/:page?" component={Home} />
            <Routelink exact path="/register" component={Register} />
            <Routelink exact path="/login" component={Login} />
            <Private exact path="/dashboard/:page?" component={Dashboard} />
            <Private exact path="/createPost" component={CreatePost} />
            <Private exact path="/edit/:id" component={Edit} />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
