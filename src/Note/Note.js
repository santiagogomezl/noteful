import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Note.css';

class Note extends Component{

    readDate(timeStamp){
        const d = new Date(timeStamp);
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getUTCFullYear();
        return `Last modified on ${month}/${day}/${year}`;
    }  
  
  render(){
    const {id, name, modified} = this.props;
    return (
        <div className="Note__item">
            <div className="Note__title"><h3><Link to={`/note/${id}`}>{name}</Link></h3></div>
            <div className="Note__modified">{this.readDate(modified)}</div>
            <div className="Note__delete">
                <button>
                    Delete Note
                </button>
            </div>
        </div>         
    );
  }
}

export default Note;