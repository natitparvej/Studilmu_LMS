import React, { Component } from 'react';
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText,FormGroup, Form, Label } from 'reactstrap';
import authService from '../../Service/authService.js';
import Service from './../userService.js';

class Owner extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,fullname: '', usertype : 'C', parentid : 0, email: '', password : '', repassword : '', visible: false, msg : '', rows: []};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.getowners = this.getowners.bind(this);
    this.handleEdit = this.handleEdit.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

    this.getowners();
  }

  getowners(){
    Service.getOwners({schoolid : this.state.lognUser.schoolid}).then(response => {
      console.log(response);
      if(response.students){
        this.setState({ rows: response.students, fullname: '', usertype : 'C',email: '', password : '', repassword : '' });
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
          this.setState({isEdittogged: 2});
          this.getowners();
        }else{
          this.showalert('Email Already Exist');
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
    console.log(this.state);
    if(this.state.isEdittogged == true){
      Service.updateUser(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.getowners();
          this.setState({isEdittogged: 2, fullname: '', id : '',
                        usertype : 'C', email: '', isactive : '',
                        exispassword : '', bio: '' });
        }
      });

    }else{
      this.setState({isEdittogged: 1,fullname: data.name, id : data.id,
                    usertype : data.user_type,email: data.email, isactive : data.is_active,
                    exispassword : data.password, bio: data.userbio });
    }
  }

  handleEdit(data){
    this.setState({isEdittogged: 0, fullname: '', id : '',
                        usertype : 'C', email: '', isactive : '',
                        exispassword : '', bio: '' });
  }

  handleDeleteClick(id){
    console.log(id);
    Service.deleteUser({userid : id}).then(response => {
      console.log(response);
      if(response.ack){
        this.getowners();
      }
    });
  }

  render() {

    const userlistdiv = this.state.isEdittogged == 1 ? (
      <Card>
        <CardHeader>
          <strong>Edit Owner</strong>
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
          <Button type="submit" size="sm" color="primary" onClick={this.handleEditClick}><i className="fa fa-dot-circle-o"></i> Update</Button>&nbsp;
          <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
        </CardFooter>
      </Card>
    ):(
      this.state.isEdittogged == 0 ? (
        <Card>
        <CardHeader>
          <strong>Add Owner</strong>
        </CardHeader>
        <CardBody>
          <Alert color="danger" isOpen={this.state.visible}>{this.state.msg}</Alert>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Full Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange} id="text-input" placeholder="Enter Full Name" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Email Address</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="email" value={this.state.email} onChange={this.handleChange} id="text-input" placeholder="Enter Email Address" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Password</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="password" value={this.state.password} onChange={this.handleChange} id="text-input" placeholder="Blank to leave unchanged" />
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
          <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Add</Button>&nbsp;
          <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
        </CardFooter>
      </Card>
      ):(
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Owners</strong>
                <div className="card-header-actions">
                  <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.handleEdit}>Add Owners</button>
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
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>&nbsp;
                      <Button color="danger" size="sm" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDeleteClick(row.id) } }><i className="fa fa-trash-o"></i></Button>
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
                </CardBody>
              
            </Card>
          </Col>
          
        </Row>
      )
      
    )
    return (
      <div className="animated fadeIn">
        {userlistdiv}
        
      </div>
    );
  }
}

export default Owner;
