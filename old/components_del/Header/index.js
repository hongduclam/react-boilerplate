import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'old/components_del/Header/A';
import Img from 'old/components_del/Header/Img';
import NavBar from 'old/components_del/Header/NavBar';
import HeaderLink from 'old/components_del/Header/HeaderLink';
import Banner from 'old/components_del/Header/banner.jpg';
import messages from 'old/components_del/Header/messages';

function Header() {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
