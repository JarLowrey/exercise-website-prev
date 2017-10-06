import React from 'react'

import Datetime from 'react-datetime'
// import styled from 'styled-components';
// import '../css/react-datetime.css';

export default class EventSearchForm extends React.Component {

  render() {
    return <Datetime
      isValidDate={(currentDate) => {
        var yesterday = Datetime.moment().subtract(1, 'day');
        return currentDate.isAfter(yesterday);
      }}
      inputProps={
        {
          placeHolder: "From",
          name: "start"
        }
      } />;
  }
}
