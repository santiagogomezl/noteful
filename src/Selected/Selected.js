import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

Selected.propTypes = {
  content: PropTypes.string.isRequired
}

export default Selected;