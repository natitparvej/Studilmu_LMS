import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Form, Label } from 'reactstrap';
import authService from '../../Service/authService.js';
import Service from './../groupService.js';

class Grouplist extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser , name: '',desc: '', isactive : '', price : '', groupkey : '',
                  ownerid : '', instructorid : '', ownerrows : [], instructorows : [],
                  visible: false, msg : '', rows: [],};


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.handleownerChange = this.handleownerChange.bind(this);
    this.handleinstrotrChange = this.handleinstrotrChange.bind(this);
    this.filteruser = this.filteruser.bind(this);
    this.getstudent = this.getstudent.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getstudent();

    Service.getOwners().then(response => {
      console.log(response);
      if(response.students){
        this.setState({ ownerrows: response.students });
      }
    },err =>{
      console.log(err);
    });

  }

  getstudent(){
    Service.getGroups({schoolid : this.state.lognUser.schoolid, usertype : "S" }).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({ rows: response.template, name: '', usertype : 3,email: '', password : '', repassword : '' });
      }else{
        this.setState({ rows: [] });
      }
    },err =>{
      console.log(err);
    });
  }

  filteruser(ownerid){
    Service.filterUser({ ownerid : ownerid, usertype : "S" }).then(response => {
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

  filterinstructor(ownerid){
    Service.filterUser({ ownerid : ownerid, usertype : "I" }).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({ instructorows: response.students });
      }else{
        this.setState({ instructorows: [] });
      }
    },err =>{
      console.log(err);
    });
  }
  
  filterStudent(instructurid){
    Service.filterStudent({ instructurid : instructurid, usertype : "S" }).then(response => {
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

  handleownerChange(event){
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value){
      this.filteruser( event.target.value );
      this.filterinstructor( event.target.value );
    }else{
      this.getstudent();
    }
  }

  handleinstrotrChange(event){
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value){
      this.filterStudent( event.target.value );
    }else{
      this.getstudent();
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.name){
      this.showalert('Enter Group Name'); return 1;
    }
    
    console.log(this.state);
      Service.addGroup(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.getstudent();
        }else{
          this.showalert('Error Adding Group');
        }
      });
    this.setState({isEdittogged: 2, name: '', id : '', price : '', desc: '', isactive : '' });
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
      Service.editGroup(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.getstudent();
          this.setState({isEdittogged: 2, name: '',desc: '', isactive : '', price : '', groupkey : '', id : ''  });
        }
      });

    }else{
      this.setState({isEdittogged: 1, id : data.id, name: data.name,desc: data.description, isactive : data.is_active, price : data.price, groupkey : data.group_key, });
    }
  }


  handleEdit(data){
    this.setState({isEdittogged: 0, name: '',desc: '', isactive : '', price : '', groupkey : '', id : '' });
  }

  handleDeleteClick(id){
    console.log(id);
    Service.deleteUser({userid : id}).then(response => {
      console.log(response);
      if(response.ack){
        this.getstudent();
      }
    });
  }


  render() {

    const userlistdiv = this.state.isEdittogged == 1 ? (
      <Card>
        <CardHeader>
          <strong>Edit Group</strong>
        </CardHeader>
        <CardBody>

          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="Group Name" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="desc" value={this.state.desc} onChange={this.handleChange} id="text-input" placeholder="Description" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Price</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="number" name="price" value={this.state.price} onChange={this.handleChange} id="text-input" placeholder="100" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Group Key</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="groupkey" value={this.state.groupkey} onChange={this.handleChange} id="text-input" placeholder="ABCD1234" />
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
          <strong>Add Group</strong>
        </CardHeader>
        <CardBody>

          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="Group Name" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="desc" value={this.state.desc} onChange={this.handleChange} id="text-input" placeholder="Description" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Price</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="number" name="price" value={this.state.price} onChange={this.handleChange} id="text-input" placeholder="100" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Group Key</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="groupkey" value={this.state.groupkey} onChange={this.handleChange} id="text-input" placeholder="ABCD1234" />
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

                <FormGroup row>
                <Col md="2">
                  <i className="fa fa-align-justify"></i><strong>  Groups</strong>
                </Col>
                
                <Col xs="12" md="8">
                  
                </Col>

                <Col xs="12" md="2">
                  <div className="card-header-actions">
                    <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.handleEdit}>Add Group</button>
                  </div>
                </Col>
                </FormGroup>

              </CardHeader>
              <CardBody>

              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Code</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td>$ {row.price}</td>
                    <td>{(row.group_key)}</td>
                    <td>
                    {this.state.rows[i].is_active == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>&nbsp;
                      <Button color="warning" size="sm" onClick={() => this.props.history.push('/groupinfo/'+row.id)}><i className="fa fa-sitemap"></i></Button>&nbsp;
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

export default Grouplist;
