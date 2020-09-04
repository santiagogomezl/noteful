import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Note from '../Note/Note';
import './Main.css';
import Selected from '../Selected/Selected';
import NotefulContext from '../NotefulContext';
import NotefulError from '../NotefulError';

class Main extends Component{
    static contextType = NotefulContext;

    getNote(noteId){
        return this.context.notes.find( note => noteId === note.id.toString());
      }
  
  render(){

    let content = [];
    const addNote = 
        <div key={'add-note'} className="Main__add-note">
            <Link to='/add-note' >Add Note</Link>
        </div>

    if(this.props.match.path === '/note/:id'){
        const noteId = this.props.match.params.id;
        const note = this.getNote(noteId);
        if(typeof note !== 'undefined'){
            content = [
                <Note key={noteId+'-note'} {...note} history={this.props.history}/>,
                <Selected key={noteId+'-content'} content={note.content} />
            ]
        }
         
    }else if(this.props.match.path === '/folder/:id' ){
        const folderId = this.props.match.params.id;
        content = this.context.notes.map((note, i) => {
            const key = `${note.name}-${i}`;
            if(note.folder_id.toString() === folderId){
                return(<Note key={key} {...note} history={this.props.history}/>)
            }
        }) 
        content = [content, addNote];

    }else if(this.context.notes){
        content = this.context.notes.map((note, i) => {
            const key = `${note.name}-${i}`;
            return(<Note key={key} {...note} history={this.props.history}/>);
        })
        content = [content, addNote]; 
    }

    return (
        <div className="Main">
            <NotefulError>
                {content}
            </NotefulError>
        </div>            
    );
  }
}

export default Main;