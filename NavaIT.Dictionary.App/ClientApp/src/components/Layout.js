import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import 'bootstrap/dist/css/bootstrap.rtl.min.css'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className='rtl'>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
