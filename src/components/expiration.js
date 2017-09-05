import React, { Component } from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';
import PropTypes from 'prop-types';


class Expiration extends Component {
  static propTypes = { 
    updateExpiration: PropTypes.func,
    expiration: PropTypes.string,
   }
  constructor(props) {
    super(props)
      this.state = { newdate: ''}
  }
  
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.expiration !== this.state.newdate) {

    this.setState({newdate: new Date(nextProps.expiration)})
    this.forceUpdate()
    }
  }

  handleChange(value) {
    let endOfDay = new Date(value).setHours(23, 59, 59, 999)
    this.setState({newdate: endOfDay})
    this.props.updateExpiration(endOfDay)
  }


  render() {
    return (
      <DatePicker
        sundayFirstDayOfWeek
        label='Expiration date'
        onChange={this.handleChange.bind(this)}
        value={this.state.newdate}
        style={{borderBottom: '1px solid #d3d3d3'}} 
      />

    );

  }
}

export default Expiration; 
