import React, { Component } from 'react';
import { Alert,Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import Service from './../pagesService.js';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {firstname: '',lastname: '',email: '', password : '', repassword : '', visible: false, msg : ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showalert = this.showalert.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.password.length);
    if(!this.state.firstname || !this.state.lastname){
      this.showalert('Enter Firstname and Lastname'); return 1;
    }

    if(!this.state.email){
      this.showalert('Enter Email Address'); return 1;
    }
    if(this.state.password != this.state.repassword){
      this.showalert('Retype Password Not Matched'); return 1;
    }
    if(this.state.password.length != 6){
      this.showalert('Password Must be Atleast Six Character'); return 1;
    }

      Service.register(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.props.history.push('/login');
        }else{
          this.showalert('Email Already Existed');
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

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <form onSubmit={this.handleSubmit}>
                  <h1>Register</h1>
                  <Alert color="danger" isOpen={this.state.visible}>
                    {this.state.msg}
                  </Alert>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Firstname" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Lastname" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Repeat password" name="repassword" value={this.state.repassword} onChange={this.handleChange}/>
                  </InputGroup>
                  <Button color="success" block>Create Account</Button>
                  </form>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
