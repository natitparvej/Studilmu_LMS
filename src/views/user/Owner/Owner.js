import React, { Component } from 'react';
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import authService from '../../Service/authService.js';
import Service from './../userService.js';

class Owner extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,firstname: '',lastname: '', usertype : 1,email: '', password : '', repassword : '', visible: false, msg : '', rows: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.getowners = this.getowners.bind(this);
    this.getowners();
  }

  getowners(){
    Service.getOwners({schoolid : this.state.lognUser.schoolid}).then(response => {
      console.log(response);
      if(response.students){
        this.setState({ rows: response.students, firstname: '',lastname: '', usertype : 1,email: '', password : '', repassword : '' });
      }
    },err =>{
      console.log(err);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.firstname || !this.state.lastname){
      this.showalert('Enter Firstname and Lastname'); return 1;
    }
    if(!this.state.email){
      this.showalert('Enter Email Address'); return 1;
    }
    if(this.state.password != this.state.repassword){
      this.showalert('Retype Password Not Matched'); return 1;
    }
    if(this.state.password && this.state.password.length != 6){
      this.showalert('Password Must be Atleast Six Character'); return 1;
    }
    console.log(this.state);
      Service.register(this.state).then(response => {
        console.log(response);
        if(response.ack){
          Service.assignSchoolowner({userid : response.userId, schoolid : this.state.lognUser.schoolid}).then(response => {
            console.log(response);
            this.toggleSuccess();
            this.getowners();
          });
        }else{
          this.showalert('Email Already Existed');
        }
      });
  }

  showalert(msgtxt) {
    setTimeout(function() { 
      this.setState({ visible: false, msg : '' });
    }.bind(this), 3000);
    this.setState({ visible: true, msg : msgtxt });
  }

  toggleSuccess() {
    this.setState({ success: !this.state.success,});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Owners</strong>
                <div className="card-header-actions">
                  <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.toggleSuccess}>Add Owners</button>
                </div>
              </CardHeader>
              <CardBody>

              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last Login</th>
                    <th>Join Date</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.firstname +' '+ row.lastname}</td>
                    <td>{row.email}</td>
                    <td>{row.joindate}</td>
                    <td>{row.joindate}</td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  
                  <ModalHeader toggle={this.toggleSuccess}>Add Owners</ModalHeader>
                  <form onSubmit={this.handleSubmit}>
                      <ModalBody>

                          
                          <Alert color="danger" isOpen={this.state.visible}>{this.state.msg}</Alert>

                          <p className="text-muted">If no password is given, user will receive an email to confirm their account and set a password.</p>

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
                            <Input type="password" placeholder="Password (optional)" name="password" value={this.state.password} onChange={this.handleChange}/>
                          </InputGroup>

                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Repeat password (optional)" name="repassword" value={this.state.repassword} onChange={this.handleChange}/>
                          </InputGroup>
                      
                      </ModalBody>
                      <ModalFooter>
                        <Button color="success" type="submit">Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleSuccess}>Cancel</Button>
                      </ModalFooter>
                  </form>

                </Modal>
                </CardBody>
              
            </Card>
          </Col>
          
        </Row>
        
      </div>
    );
  }
}

export default Owner;
