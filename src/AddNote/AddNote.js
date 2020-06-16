import React, {Component} from 'react';
import './AddNote.css';
import NotefulContext from '../NotefulContext';

class AddNote extends Component{
  static contextType = NotefulContext;
  state = {
    noteTitle: {
      value: '',
      touched: false
    },
    content: {
        value: '',
        touched: false
    },
    folderId:{
        value:'',
        touched: false
    }
  }

  updateNoteTitle(noteTitle ){
    this.setState({
        noteTitle: {value: noteTitle, touched: true}
    })
  }

  updateContent(content){
    this.setState({
        content: {value: content, touched: true}
    })
  }

  updateFolder(folderName, folders){

    const folder = folders.find(folder => folder.name === folderName);
    if(folder){
        this.setState({
            folderId: {value: folder.id, touched: true}
        });
    }else{
        this.setState({folderId: {touched: true}})
    }
  }

  displayError(err){
    alert(err);
  }


  handleSubmit(event, callback){
    event.preventDefault();
    const id = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    const name = this.state.noteTitle.value;
    const content = this.state.content.value;
    const modified = new Date().toISOString();
    const folderId = this.state.folderId.value

    const note = {id, name, modified, folderId, content}
    const options = {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch('http://localhost:9090/notes', options)
    .then(response => {
        if(!response.ok){
          throw new Error('Something went wrong');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        callback(data);
        this.setState(
            {
                noteTitle:{value:''},
                content:{value:''},
                folderId:{value:''},
            }
        );
        this.props.history.push('/');
        }
      )
      .catch(err => this.displayError(err));
    
  }
  
  validateTitle(){
    const noteTitle = this.state.noteTitle.value.trim();
    if(noteTitle.length === 0){
      return <p className='form-error'>{'Note Title is required'}</p>  
    }
  }

  validateContent(){
    const content = this.state.content.value.trim();
    if(content.length === 0){
      return <p className='form-error'>{'Content is required'}</p>  
    }
  }

  validateFolder(){
    const folderId = this.state.folderId.value;
    if(!folderId){
      return <p className='form-error'>{'Select a Folder from the list'}</p>  
    }
  }


  render(){
    const folders = this.context.folders.map((folder,i) => {
        const folderName = folder.name;
        return(
            <option key={`${folderName}-${i}`} value={`${folderName}`}>{folderName}</option>
        );
    });
    return (
      <NotefulContext.Consumer>
        {(context) => (
          <div className='AddNote'>
              <h2>Add Note</h2>
              <form className='AddNote__form' onSubmit={e => this.handleSubmit(e, context.addNote)}>
                <label htmlFor='noteTitle'>Note Title</label>
                <input 
                  placeholder='Note Title' 
                  name='noteTitle' 
                  id='noteTitle'
                  onChange={e => this.updateNoteTitle(e.target.value)}/>
                  {this.state.noteTitle.touched && this.validateTitle()}

                <label htmlFor='content'>Content</label>
                <textarea
                  placeholder='Lorem Ipsum' 
                  name='content' 
                  id='content'
                  onChange={e => this.updateContent(e.target.value)}> 
                </textarea>
                {this.state.content.touched && this.validateContent()}

                <label htmlFor="folders">Choose a folder:</label>
                <select 
                    name="folders" 
                    id="folders"
                    onChange={e => this.updateFolder(e.target.value, context.folders)}>
                    <option key={'select-folder'} id='select-folder'>Select Folder...</option>
                    {folders}
                </select>  
                {this.state.folderId.touched && this.validateFolder()}
                  
                <button 
                    type='submit'
                    disabled={
                        this.validateTitle() ||
                        this.validateContent() ||
                        this.validateFolder()  
                    }
                    >
                    + Add
                </button>
                <button type='reset'
                  onClick={() => this.props.history.push('/')}
                  >Cancel
                </button>
              </form>
          </div>
        )}
     </NotefulContext.Consumer>
    );
  }
}

export default AddNote;