
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Fragment } from 'react'
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Detail from './containers/Detail/Detail';
import Login from './containers/login/Login';
import TopRated from './containers/TopRated/TopRated';
import UpComing from './containers/UpComing/UpComing.jsx';



function App() {
  return (
    <Fragment>
          <BrowserRouter>
            <Header />

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/upcoming" exact component={UpComing}/>
              <Route path="/toprated" exact component={TopRated}/>
              <Route path="/detail" exact component={Detail}/>
              <Route path="/login" exact component={Login}/>
            </Switch>

          </BrowserRouter>
    </Fragment>
  );
}

export default App;
