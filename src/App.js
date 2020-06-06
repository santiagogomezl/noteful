import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      folders: [],
      notes:[],
    }
  }

  componentDidMount(){
    this.setState({
      folders: this.props.store.folders,
      notes: this.props.store.notes,
    });
  }

  handleAddFolder(){
    //To do: generate random folder ID and name
    
  }

  findFolderName(noteId){
   let note = {};
   let folder = {};
    if(!this.state){
      note = this.state.notes.find( note => noteId === note.id);
      folder = this.state.folders.find( folder => note.folderId === folder.id);
    }else{
      note = this.props.store.notes.find( note => noteId === note.id);
      folder = this.props.store.folders.find( folder => note.folderId === folder.id);
    }
    return folder.name;
  }

  retrieveNote(noteId){
    return this.state.notes.find( note => noteId === note.id);
  }


  render(){
    const {folders, notes} = this.state;
    return (
        <main className='App'>
          <Header />
          <div className="App__main">
            {/* home / */}
            <Route exact path='/' render={()=> <Sidebar folders={folders} />}/>
            <Route exact path='/' render={()=> <Main notes={notes}/>}/>

            {/* dynamic folder /folder/folderId */}
            <Route path='/folder/:id' render={()=> <Sidebar folders={folders} />}/>
            <Route path='/folder/:id' render={(props)=> <Main notes={notes} folderId={props.match.params.id} />}/>

            {/* dynamic note /note/id */}
            <Route 
              path='/note/:id' 
              render={(props)=> <Sidebar folderName={this.findFolderName(props.match.params.id)}/>}/>
            <Route path='/note/:id' render={(props)=> <Main selected={this.retrieveNote(props.match.params.id)}/>}/>
            
          </div>
        </main>
    );
  }
}

App.defaultProps={
  folders: [],
  notes: []
}

export default App;