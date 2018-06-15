import React, { Component } from 'react';
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Form, Label } from 'reactstrap';
import authService from '../../Service/authService.js';
import Service from './../userService.js';

class Instructor extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,fullname: '', usertype : 'I',email: '', parentid : '', isactive : '',
                  password : '', repassword : '',
                  ownerrows : [], visible: false, msg : '', rows: []
                };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.getinstructor = this.getinstructor.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleownerChange = this.handleownerChange.bind(this);
    this.getinstructor();

    Service.getOwners().then(response => {
      console.log(response);
      if(response.students){
        this.setState({ ownerrows: response.students });
      }
    },err =>{
      console.log(err);
    });
  }

  getinstructor(){
    Service.getInstructor({schoolid : this.state.lognUser.schoolid}).then(response => {
      console.log(response);
      if(response.students){
        this.setState({ rows: response.students, fullname: '', usertype : 'I',email: '', password : '', repassword : '' });
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
    if(!this.state.fullname){
      this.showalert('Enter Fullname'); return 1;
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
          this.toggleSuccess();
          this.getinstructor();
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

  filteruser(ownerid){
    console.log(ownerid);
    Service.filterUser({ ownerid : ownerid, usertype : "I" }).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({ rows: response.students });
      }else{
        this.setState({ rows: [] });
      }
    },err =>{
      console.log(err);
    });
  }

  handleEditClick(data){
    console.log(this.state);
    if(this.state.isEdittogged == true){
      Service.updateUser(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.getinstructor();
          this.setState({isEdittogged: false, fullname: '', id : '',
                        usertype : '', email: '', isactive : '',
                        exispassword : '', bio: '' });
        }
      });

    }else{
      this.setState({isEdittogged: true,fullname: data.name, id : data.id,
                    usertype : data.user_type,email: data.email, isactive : data.is_active,
                    exispassword : data.password, bio: data.userbio });
    }
  }

  handleownerChange(event){
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value){
      this.filteruser( event.target.value );
    }else{
      this.getinstructor();
    }
  }

  handleDeleteClick(id){
    console.log(id);
    Service.deleteUser({userid : id}).then(response => {
      console.log(response);
      if(response.ack){
        this.getinstructor();
      }
    });
  }

  render() {

    const userlistdiv = this.state.isEdittogged ? (
      <Card>
        <CardHeader>
          <strong>Edit Category</strong>
        </CardHeader>
        <CardBody>

          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Full Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange} id="text-input" placeholder="e.g. 'User Full Name'" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Email Address</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="email" value={this.state.email} onChange={this.handleChange} id="text-input" placeholder="e.g. 'User Email Address'" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Password</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="newpassword" value={this.state.newpassword} onChange={this.handleChange} id="text-input" placeholder="Blank to leave unchanged" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="select">User Role</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select" id="usertype" name="usertype" onChange={this.handleChange} value={this.state.usertype}>
                  <option value='' disabled>Please Select</option>
                  <option value='C'>Owner</option>
                  <option value='I'>Instructor</option>
                  <option value='S'>Student</option>
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="select">Status</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select" id="isactive" name="isactive" onChange={this.handleChange} value={this.state.isactive}>
                  <option value='' disabled>Please Select</option>
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </Input>
              </Col>
            </FormGroup>

          

          </Form>

        </CardBody>
        <CardFooter>
          <Button type="submit" size="sm" color="primary" onClick={this.handleEditClick}><i className="fa fa-dot-circle-o"></i> Update</Button>
        </CardFooter>
      </Card>
    ):(
      <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>       
                <FormGroup row>
                <Col md="2">
                  <i className="fa fa-align-justify"></i><strong>  Instructor</strong>
                </Col>
                <Col xs="12" md="8">
                  <Input type="select" name="ownerid" onChange={this.handleownerChange} value={this.state.ownerid}>
                    <option value='' >Select Owner</option>
                    {this.state.ownerrows.map((row, i) =>
                    <option value={row.id} key={i}>{row.name}</option>
                    )}
                  </Input>
                </Col>
                <Col xs="12" md="2">
                  <div className="card-header-actions">
                    <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.toggleSuccess}>Add Instructor</button>
                  </div>
                </Col>
                </FormGroup>
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
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.joindate}</td>
                    <td>{row.joindate}</td>
                    <td>
                    {this.state.rows[i].is_active == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>
                      <Button color="danger" size="sm" onClick={() => this.handleDeleteClick(row.id)}><i className="fa fa-trash-o"></i></Button>
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  
                  <ModalHeader toggle={this.toggleSuccess}>Add Instructor</ModalHeader>
                  <form onSubmit={this.handleSubmit}>
                      <ModalBody>

                          
                          <Alert color="danger" isOpen={this.state.visible}>{this.state.msg}</Alert>

                          <p className="text-muted">If no password is given, user will receive an email to confirm their account and set a password.</p>

                          <InputGroup className="mb-3">
                            <Input type="select" name="parentid" onChange={this.handleChange} value={this.state.parentid}>
                              <option value='' >Please Select Owner</option>
                              {this.state.ownerrows.map((row, i) =>
                              <option value={row.id} key={i}>{row.name}</option>
                              )}
                            </Input>
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Full Name" name="fullname" value={this.state.fullname} onChange={this.handleChange}/>
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
    )
    return (
      <div className="animated fadeIn">
        {userlistdiv}
      </div>
    );
  }
}

export default Instructor;
