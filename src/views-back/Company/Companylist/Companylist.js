import React, { Component } from 'react';
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText,Form, FormGroup, FormText, Label } from 'reactstrap';
import authService from '../../Service/authService.js';
import Service from './../companyService.js';

class Companylist extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,firstname: '',lastname: '', usertype : 1,email: '', password : '', repassword : '',newpassword:'', visible: false, msg : '', rows: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.getowners = this.getowners.bind(this);
    this.getowners();
  }

  getowners(){
    Service.getUser({schoolid : this.state.lognUser.schoolid}).then(response => {
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

  handleEditClick(data){
    console.log(data);
    if(this.state.isEdittogged == true){
      console.log(this.state);
      // Service.editCategory(this.state).then(response => {
      //   console.log(response);
      //   if(response.ack){
      //     this.category();
          this.setState({isEdittogged: false, categoryname: '',categoryprice: '', categoryid : '' });
      //   }
      // });
    }else{
      this.setState({isEdittogged: true,firstname: data.firstname,lastname: data.lastname, usertype : data.usertype,email: data.email, exispassword : data.password, bio: data.userbio });
    }
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
                <Label htmlFor="text-input">First Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Last Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Email Address</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="email" value={this.state.email} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
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
                  <option value='1'>Admin</option>
                  <option value='2'>Instructor</option>
                  <option value='3'>Student</option>
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Bio</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="categoryprice" value={this.state.categoryprice} onChange={this.handleChange} id="text-input" rows="9" placeholder="e.g. 'Everything you need to know about video editing'" />
                
              </Col>
            </FormGroup>

          </Form>

        </CardBody>
        <CardFooter>
          <Button type="submit" size="sm" color="primary" onClick={this.handleEditClick}><i className="fa fa-dot-circle-o"></i> Update</Button>
        </CardFooter>
      </Card>
    ) : (
      <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Company</strong>
                <div className="card-header-actions">
                  <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.toggleSuccess}>Add User</button>
                </div>
              </CardHeader>
              <CardBody>

              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    
                    
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr>
                    <td>Company Name</td>
                     <td>companymail@mail.com</td>
                    <td>10/10/2012</td>
                    <td>
                     <Badge color="success">Active</Badge>
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick()}><i className="fa fa-pencil"></i></Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash-o"></i></Button>
                    </td>
                  </tr>



                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.firstname +' '+ row.lastname}</td>
                   
                    <td>{row.joindate}</td>
                    <td>
                    {this.state.rows[i].status == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash-o"></i></Button>
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  
                  <ModalHeader toggle={this.toggleSuccess}>Add User</ModalHeader>
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
    );

    return (
      <div className="animated fadeIn">
      {userlistdiv}
      </div>
    );
  }
}

export default Companylist;
