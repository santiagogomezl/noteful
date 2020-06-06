import React, {Component} from 'react';
import Folder from '../Folder/Folder';
import {Link} from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component{
  
  render(){
    let sidebarContent = [];
    const addFolder = <Link key={'add-foldet'} to='' >Add Folder</Link>
    const goBack = <Link key={'go-back'} to='' >Go Back</Link>
    if(this.props.folders){
        sidebarContent = this.props.folders.map((folder, i) => {
            const key = `${folder.name}-${i}`;
            return(
                <Folder key={key} {...folder}/>
            );
        })
        sidebarContent = [...sidebarContent, addFolder]
    }

    else if(this.props.folderName){
        sidebarContent = [
            goBack,
            <div className="Sidebar__folder-title">
                <h2>{this.props.folderName}</h2>
            </div>
        ]
    }
    return (
     <div className="Sidebar">
       {sidebarContent}
     </div>
    );
  }
}

export default Sidebar;