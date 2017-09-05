import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';
import axios from 'axios';

class Decrypt extends Component {
  static PropTypes = { 
    message: PropTypes.string,
    updateName: PropTypes.func,
    updateMessage: PropTypes.func,
    updateExpiration: PropTypes.func
   }

  decipher() {
    let hash = window.location.hash
    axios.get('/api/decrypt', {
      params: { key: this.props.message, pass: hash}})
    .then((res) => {
      this.props.updateName(res.data.name);
      this.props.updateMessage(res.data.message);
      this.props.updateExpiration(res.data.expiration);
    })
    .catch((err) => { console.log(err)
      window.alert('Invalid request')
    })
  }

  render() {
    return (
      <Button label="Decrypt" 
      onClick={this.decipher.bind(this)}
      />
    )
  }
}

export default Decrypt;