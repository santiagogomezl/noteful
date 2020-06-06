import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component{

  render(){
    return(
       <header className="Header__site-header">
            <h1>
                <Link to='/'>Noteful</Link>
            </h1>
       </header>
    );
  }
}

export default Header;