import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotefulContext from './NotefulContext';
import config from './config';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      folders: [],
      notes:[],
    }
  }

  displayError(err){
    alert(err);
  }

  componentDidMount(){
    this.setState({
    });
    const foldersEndpoint = `${config.API_ENDPOINT}api/folders`;
    fetch(foldersEndpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
      this.setState({
        folders: data
      })
    })
    .catch(err => this.displayError(err));

    const notesEndpoint = `${config.API_ENDPOINT}api/notes`;
    fetch(notesEndpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
      this.setState({
        notes: data
      })
    })
    .catch(err => this.displayError(err));

  }

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  }

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  }

  deleteNote = (noteId) =>{
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
      this.setState(
        {
          notes: newNotes
        }
      );
  }

  render(){

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    }
   
    return (
        <main className='App'>
          <Header />
          <NotefulContext.Provider value={contextValue}>
            <div className="App__main">
              {/* home / */}
              <Route exact path='/' component={Sidebar}/>
              <Route exact path='/' component={Main}/>

              {/* dynamic folder /folder/folderId */}
              <Route path='/folder/:id' component={Sidebar}/>
              <Route path='/folder/:id' component={Main}/>


              {/* dynamic note /note/id */}
              <Route path='/note/:id' component={Sidebar}/>
              <Route path='/note/:id' component={Main}/>

              
              <Route path='/add-folder' component={AddFolder}/>
              <Route path='/add-note' component={AddNote}/>

            </div>
            </NotefulContext.Provider>
        </main>
    );
  }
}

App.defaultProps={
  folders: [],
  notes: []
}

export default App;