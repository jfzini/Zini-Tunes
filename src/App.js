import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    logado: false,
    isLoading: false,
  };

  handleSubmit = async (nameValue) => {
    this.setState({
      isLoading: true,
    });
    await createUser({ name: nameValue });
    this.setState({
      logado: true,
    });
  };

  render() {
    const { logado, isLoading } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {logado
              ? <Redirect to="/search" />
              : <Login isLoading={ isLoading } handleSubmit={ this.handleSubmit } />}
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
