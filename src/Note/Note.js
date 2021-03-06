import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Note.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import config from '../config';


class Note extends Component{
    static contextType = NotefulContext;

    displayError(err){
        //todo 
      }

    deleteNoteRequest(noteId, callback){
        fetch(`${config.API_ENDPOINT}api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(response => {
            if(!response.ok){
              throw new Error('Something went wrong');
            }
            return response;
          })
            .then(data => {
            callback(noteId);
            this.props.history.push('/');
            }
         )
         .catch(err => this.displayError(err));
    }

    readDate(timeStamp){
        const d = new Date(timeStamp);
        const day = d.getDate();
        const month = d.getMonth()+1;
        const year = d.getUTCFullYear();
        return `Last modified on ${month}/${day}/${year}`;
    }  
  
  render(){
    const {id, name, modified} = this.props;
    return (
        <NotefulContext.Consumer>
            {(context) => (
                <div className="Note__item">
                <div className="Note__title"><h3><Link to={`/note/${id}`}>{name}</Link></h3></div>
                <div className="Note__modified">{this.readDate(modified)}</div>
                <div className="Note__delete">
                    <button onClick={() => {
                        this.deleteNoteRequest(id, context.deleteNote)}}
                    >
                        Delete Note
                    </button>
                </div>
            </div>
            )}
        </NotefulContext.Consumer>         
    );
  }
}

Note.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
}

export default Note;