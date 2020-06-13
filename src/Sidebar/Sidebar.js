import React, {Component} from 'react';
import Folder from '../Folder/Folder';
import {Link} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import NotefulError from '../NotefulError';
import './Sidebar.css';

class Sidebar extends Component{
  static contextType = NotefulContext;

  findFolderName(noteId){
    const note = this.context.notes.find( note => noteId === note.id);
    if(note){
      const folder = this.context.folders.find( folder => note.folderId === folder.id);    
      return folder.name
    }
  }
  
  render(){

    let sidebarContent = [];
    const addFolder = <Link key={'add-folder'} to='/add-folder' >+ Add Folder</Link>
    const goBack = <Link key={'go-back'} to='' >Go Back</Link>


    if(this.props.match.path === '/note/:id'){
      const noteId = this.props.match.params.id;
      sidebarContent = [
          goBack,
          <div className="Sidebar__folder-title" key={'folder-title'}>
              <h2>{this.findFolderName(noteId)}</h2>
          </div>
      ]
    }else if(this.context.folders){
        sidebarContent = this.context.folders.map((folder, i) => {
            const key = `${folder.name}-${i}`;
            return(
                <Folder key={key} {...folder}/>
            );
        })
        sidebarContent = [...sidebarContent, addFolder]
    }

    
    return (
     <div className="Sidebar">
       <NotefulError>
        {sidebarContent}
      </NotefulError>
     </div>
    );
  }
}


export default Sidebar;