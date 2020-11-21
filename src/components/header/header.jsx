import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../const";
import {connect} from "react-redux";

export const HeaderComponent = (props) =>{
  const {authorizationStatus} = props;
  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  const link = isAuth ? `/favorites` : `/login`;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={`/`}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={link} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {isAuth
                    ? <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    : <span className="header__login">Sign in</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

HeaderComponent.propTypes = {
  authorizationStatus: PropTypes.string.isRequired
};


const mapStateTopProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
});

export const Header = connect(mapStateTopProps)(HeaderComponent);
