import React, {Component} from 'react';
import './AddFolder.css';
import NotefulContext from '../NotefulContext';
import config from '../config';


class AddFolder extends Component{
  static contextType = NotefulContext;
  state = {
    folderName: {
      value: '',
      touched: false
    }
  }

  updateFolderName(folderName ){
    this.setState({
      folderName: {value: folderName, touched: true}
    })
  }

  displayError(err){
    alert(err);
  }

  handleSubmit(event, callback){
    event.preventDefault();
    const name = this.state.folderName.value

    const folder = { name }
    const options = {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${config.API_KEY}`
      }
    };

    fetch(`${config.API_ENDPOINT}api/folders`, options)
    .then(response => {
        if(!response.ok){
          throw new Error('Something went wrong');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        callback(data);
        this.setState({folderName:{value:''}});
        this.props.history.push('/');
        }
      )
      .catch(err => this.displayError(err));
    
  }
  
  validateForm(){
    const folderName = this.state.folderName.value.trim();
    if(folderName.length === 0){
      return <p className='form-error'>{'Folder Name is required'}</p>  
    }
  }
  

  render(){
    return (
      <NotefulContext.Consumer>
        {(context) => (
          <div className='AddFolder'>
              <h2>Add Folder</h2>
              <form className='AddFolder__form' onSubmit={e => this.handleSubmit(e, context.addFolder)}>
                <label htmlFor='folderName'>Folder Name</label>
                <input 
                  placeholder='Folder Name' 
                  name='folderName' 
                  id='folderName'
                  onChange={e => this.updateFolderName(e.target.value)}/>
                  {this.state.folderName.touched && this.validateForm()}
                <button 
                  type='submit'
                  disabled={this.validateForm()}>
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

export default AddFolder;