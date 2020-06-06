import React, {Component} from 'react';
import './Selected.css';

class Selected extends Component{
  
  render(){

    return (
        <div className="Selected">
            <p>{this.props.content}</p>
        </div>          
    );
  }
}

export default Selected;