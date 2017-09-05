import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import PropTypes from 'prop-types';

class Message extends Component {
  static propTypes = { 
    updateMessage: PropTypes.func,
    message: PropTypes.string 
  }
    state = {
      message: '', 
      label: 'message',
    }
  

  updateMessage(msg) {
    this.setState({message: msg})
    this.props.updateMessage(msg)
  }

  render() {
    return (
      <div>
        <Input type='text' 
          maxLength={120} 
          value={this.props.message}
          label={this.state.label} 
          multiline 
          onChange={this.updateMessage.bind(this)}
          style={{borderBottom: '1px solid #d3d3d3'}} 
        /> 
      </div>

    );

  }
}

export default Message; 
