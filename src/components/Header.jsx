import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
  };

  async componentDidMount() {
    const userData = await this.fetchUserData();
    const { name } = userData;
    this.setState({
      userName: name,
      isLoading: false,
    });
  }

  fetchUserData = async () => {
    const fetchUser = await getUser();
    return fetchUser;
  };

  render() {
    const { userName, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading
          ? <Loading />
          : <span data-testid="header-user-name">{`Olá, ${userName}`}</span>}
      </header>
    );
  }
}

export default Header;
