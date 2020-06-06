import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Note from '../Note/Note';
import './Main.css';
import Selected from '../Selected/Selected';

class Main extends Component{
  
  render(){

    let content = [];
    const addNote = 
        <div key={'add-note'} className="Main__add-note">
            <Link to='' >Add Note</Link>
        </div>

    if(this.props.selected){
        const hash = `${this.props.selected.id}`
        content = [
            <Note key={hash+'-note'} {...this.props.selected}/>,
            <Selected key={hash+'-content'} content={this.props.selected.content} />
        ]
         
    }else if(this.props.folderId){
        content = this.props.notes.map((note, i) => {
            const key = `${note.name}-${i}`;
            if(note.folderId === this.props.folderId){
                return(<Note key={key} {...note}/>)
            }
        }) 
        content = [content, addNote];

    }else if(this.props.notes){
        content = this.props.notes.map((note, i) => {
            const key = `${note.name}-${i}`;
            return(<Note key={key} {...note}/>);
        })
        content = [content, addNote]; 
    }

    return (
        <div className="Main">
            {content}
        </div>            
    );
  }
}

export default Main;