import React, { Component,PropTypes } from 'react';
import { Route , Redirect, withRouter} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';

import axios from 'axios';
import Service from './../pagesService.js';
import authService from '../../Service/authService.js';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password : '', otp : '', newpassword: '', renewpassword  : '', visible: false,};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleOtp = this.handleOtp.bind(this);
    this.handleResetpassword = this.handleResetpassword.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleResetpassword(){
    console.log(this.state);
    if(this.state.newpassword != this.state.renewpassword){ 
      this.showalert('Retype password not matched');
      return;
    }

    if(this.state.newpassword.length != 6){ 
      this.showalert('Password length must be atleast 6');
      return;
    }
    Service.resetPassword(this.state).then(response => {
      console.log(response);
      if(response.ack){
        this.handleLoginClick();
        this.showalert('Reset Password Successfully');
      }else{
        this.showalert('Password Reset Failed');
      }
    });
  }

  handleOtp(){
    var val = Math.floor(1000 + Math.random() * 9000);
    Service.setOtp({otp : val, email : this.state.email}).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({otp : val });
        this.setState({otpbox : "false"});
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    Service.login(this.state).then(response => {
      console.log(response);
      if(response.ack){
        authService.setUser(response.userData[0]);
        window.location.assign('#/dashboard');
        window.location.reload();
      }else{
        this.showalert('Wrong Emailid and Password');
      }
    },err =>{
      console.log(err);
    });
    
  }

  showalert(msgtxt) {
    setTimeout(function() {
      this.setState({ visible: false, msg : '' });
    }.bind(this), 3000);
    this.setState({ visible: true, msg : msgtxt });
  }

  handleLoginClick(data){
    console.log(data);
    if(this.state.isLoggedIn == true){
      this.setState({isLoggedIn: false, otp : '', newpassword: '', renewpassword  : '' });
    }else{
      this.setState({isLoggedIn: true});
    }
  }

  render() {
    const button = this.state.isLoggedIn ? (
      <input type="submit" onClick={this.handleLoginClick} value="Details"/>
    ) : (
      <input type="submit" onClick={this.handleLoginClick} value="All Course"/>
    );

    const logindiv = this.state.isLoggedIn ? (
      <Row className="justify-content-center">
        <Col md="8">
          <CardGroup>
            <Card className="p-3">
              <CardBody>
              
                <h1>Reset Password</h1>

                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="Username" name="email" value={this.state.email} onChange={this.handleChange} />
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="OTP" name="otp" value={this.state.otp} onChange={this.handleChange} disabled={!this.state.otpbox}/>
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="New Password" name="newpassword" value={this.state.newpassword} onChange={this.handleChange} disabled={!this.state.otpbox}/>
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="Retype New Password" name="renewpassword" value={this.state.renewpassword} onChange={this.handleChange} disabled={!this.state.otpbox}/>
                </InputGroup>

                <Row>
                  <Col xs="2">
                    <Button color="primary" className="px-4" onClick={this.handleOtp} disabled={this.state.otpbox}>Get OTP</Button>
                  </Col>
                  <Col xs="6">
                    <Button color="primary" disabled={!this.state.otpbox} className="px-4" onClick={this.handleResetpassword}>Reset Password</Button>
                  </Col>
                </Row>
                <Alert color="danger" isOpen={this.state.visible}>{this.state.msg}</Alert>
                
                <Row>
                  <Col xs="12" className="text-right">
                    <Button color="secondary" className="px-4" onClick={this.handleLoginClick}>Cancel</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            
          </CardGroup>
        </Col>
      </Row>
    ):(
      <Row className="justify-content-center">
        <Col md="8">
          <CardGroup>
            <Card className="p-4">
              <CardBody>
              <form onSubmit={this.handleClick}>
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="Username" name="email" value={this.state.email} onChange={this.handleChange} />
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </InputGroup>
                <Row>
                  <Col xs="6">
                    <Button color="primary" className="px-4" onClick={this.handleSubmit}>Login</Button>
                  </Col>
            
                </Row>
                <Alert color="danger" isOpen={this.state.visible}>{this.state.msg}</Alert>
                </form>
                <Row>
                  <Col xs="12" className="text-right">
                    <Button color="secondary" className="px-4" onClick={this.handleLoginClick}>Forgot Password ?</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
              <CardBody className="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <Button color="primary" onClick={() => this.props.history.push(`/register`)} className="mt-3" active>Register Now!</Button>
                </div>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    );
    return (
      
      <div className="app flex-row align-items-center">
        <Container>
          {logindiv}
        </Container>
      </div>
    );
  }
}

export default Login;
