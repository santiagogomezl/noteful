import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Folder.css';

class Folder extends Component{
  
  render(){
    const {id, name} = this.props;
    return (
        <div className="Folder__item">
            <NavLink to={`/folder/${id}`}>
                {name}
            </NavLink>
        </div>
    );
  }
}

export default Folder;