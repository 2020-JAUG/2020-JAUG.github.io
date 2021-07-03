
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Fragment } from 'react'
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Profile from './containers/Profile/Profile';
import Detail from './containers/Detail/Detail';
import Login from './containers/login/Login';
import TopRated from './containers/TopRated/TopRated';
import UpComing from './containers/UpComing/UpComing.jsx';
import Popular from './containers/Popular/Popular';
import MoviesGenre from './containers/MoviesGenre/MoviesGenre';
import UpdateUser from './containers/Profile/UpdateUser';
import OrdersUser from './containers/Orders/OrdersUser.jsx';
import MovieTitle from './containers/MovieTitle/MovieTitle';


function App() {
  return (
    <Fragment>
          <BrowserRouter>
            <Header />

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/profile" exact component={Profile}/>
              <Route path="/updateuser" exact component={UpdateUser}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/upcoming" exact component={UpComing}/>
              <Route path="/toprated" exact component={TopRated}/>
              <Route path="/popular" exact component={Popular}/>
              <Route path="/detail" exact component={Detail}/>
              <Route path="/moviesgenre" exact component={MoviesGenre}/>
              <Route path="/ordersuser" exact component={OrdersUser}/>
              <Route path="/movietitle" exact component={MovieTitle}/>
            </Switch>

          </BrowserRouter>
    </Fragment>
  );
}

export default App;

// import {Input, notification} from 'antd';
//  notification.success({message:'Usuario registrado.',description: "Te hemos enviado un email para activar la cuenta." });
