import React, {Component} from 'react';
import Button from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import axios from 'axios';

class Encrypt extends Component {
  static PropTypes = {
    name: PropTypes.string,
    message: PropTypes.string,
    expiration: PropTypes.string
  }
  state = { crypt: '', active: false }

  onClick() {
    axios.post('/api/encrypt', {
        name: this.props.name,
        message: this.props.message,
        expiration: this.props.expiration,
        passphrase: window.location.hash      
    })
    .then((res) => {
      const code = res.data;
      this.setState({crypt: code});
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

    window.setTimeout(this.handleToggle, 1000);
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  actions = [
    { label: "Close", onClick: this.handleToggle }
  ];


  render() {
    return (
      <div>
        <Button label='ENCRYPT' onClick={this.onClick.bind(this)} />
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Your message is now encrypted!'
        >
          <div><Input value={this.state.crypt}
          style={{borderBottom: '1px solid #d3d3d3'}}/>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default Encrypt;