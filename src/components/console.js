import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Message from './message';
import Expiration from './expiration';
import PassPhrase from './passphrase';
import Encrypt from './encrypt';
import Decrypt from './decrypt';


class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      expiration: ''
    }
  }

  updateName(name) {
    this.setState({name: name});
  }
  
  updateMessage(msg) {
    this.setState({message: msg});
  }

  updateExpiration(exp) {
    this.setState({expiration: exp});
    console.log('CONSOLE COMPONENT:', this.state.expiration)
  }


  render() {
    let label = this.state.name === '' ? 'Name' : '';
    return (
      <div style={styles.card}>
        <Card >
          <CardTitle
            avatar="https://placeimg.com/80/80/animals" 
            title={
              <Input 
                type='text' 
                label={label} 
                value={this.state.name}
                onChange={this.updateName.bind(this)} 
                style={styles.input} 
              />}
          />
          <CardText>
            {<Message 
              updateMessage={this.updateMessage.bind(this)}
              message={this.state.message}/>}
          </CardText>  
          <CardText>
            {<Expiration 
              updateExpiration={this.updateExpiration.bind(this)}
              expiration={this.state.expiration}/> }
          </CardText>
          <CardActions >
            <Encrypt 
            name={this.state.name}
            expiration={this.state.expiration}
            message={this.state.message}/>
            <Decrypt 
            message={this.state.message}
            updateName={this.updateName.bind(this)}
            updateMessage={this.updateMessage.bind(this)}
            updateExpiration={this.updateExpiration.bind(this)}/>
          </CardActions>
        </Card>
        <div style={styles.passphrase}>
          <PassPhrase/>
        </div>
      </div>
    );

  }
}
const styles = {
  card: {  
    width: '50%',  
    margin: 'auto', 
    height: '400px'
  },
  passphrase: {
    marginTop: '20px', 
    float: 'right'
  },
  input: {
    borderBottom: '1px solid #d3d3d3'
  }
}

export default Console;