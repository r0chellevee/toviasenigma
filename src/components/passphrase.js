import React, {Component} from 'react';
import Chip from 'react-toolbox/lib/chip';
import axios from 'axios';


class Passphrase extends Component {
  constructor(props) {
    super(props);
    this.state = {key: window.location.hash.slice(1) }
  }
  
  componentDidMount() {
    if (window.location.href === "http://localhost:3000/") {
      this.generateNewKey()
    }

    let hash = window.location.hash;
    localStorage.setItem('hash', hash)
    hash = localStorage.getItem('hash');

    if (hash !== '') {
      axios.get('/:passphrase', {
        params: { passphrase: hash }})
      .then((res) => {
        console.log(res.data)
        if (res.data === hash) {
           this.setState({key: hash.slice(1)})
        } else {
          window.alert("Invalid Passphrase")
          this.generateNewKey()
        }
      })
      .catch((err) => {console.log(err)
        this.setState({key: hash.slice(1)})
      });
    } else {
      this.generateNewKey()
    }
  }

  generateNewKey() {
    axios.get('/api/hash')
    .then((res) => {const pass = res.data;
      this.setState({key: pass});
      this.addHash();
    })
    .catch((err) => console.log(err)) 
  }

  addHash() {
    window.location.hash = '#' + this.state.key;
  }

  render() {
    return (
      <div >
        <div id='passphrase'>
          {this.state.key}
        </div>
        <Chip onClick={this.generateNewKey.bind(this)}>
        New Passphrase</Chip>
      </div>
    )
  }
}

export default Passphrase;