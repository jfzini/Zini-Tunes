import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './css/Header.css';
import logo from '../images/sound-waves.png';

class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
    showMenu: false,
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

  setShowMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  render() {
    const { userName, isLoading, showMenu } = this.state;

    return (
      <header data-testid="header-component">
        <div className="header__username">
          {isLoading
            ? <Loading />
            : (
              <div className="header__logo">
                <Link exact to="/" data-testid="link-to-search">
                  <img src={ logo } alt="logo" />
                </Link>
                <span data-testid="header-user-name">{userName}</span>
              </div>
            )}
        </div>
        <nav className={`header__navbar ${showMenu? 'show-menu' : ''}` }>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <a href='/'>Logout</a>
        </nav>
        <div
          className={ `hamburger ${showMenu ? 'active' : ''}` }
          onClick={ this.setShowMenu }
        >
          <span /> {/*spans that make the hamburger menu*/}
          <span />
          <span />
        </div>
      </header>
    );
  }
}

export default Header;
