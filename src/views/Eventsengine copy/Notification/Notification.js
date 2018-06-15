import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem, } from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../eventsService.js';

class Notification extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,user_id : lognUser.schoolid, name: '', visible: false, msg : '', ownerrows : [], rows: [],
                  isEdittogged : 2
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.notification = this.notification.bind(this);
    this.handleownerChange = this.handleownerChange.bind(this);
    //this.handleAdddClick = this.handleAdddClick.bind(this);
    this.notification();
  
  }
  
  notification(){
    console.log(this.state);
    Service.getNotificationtemplate({admin_id : this.state.lognUser.id }).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ rows : response.template, name: ''});
        }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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


  handleownerChange(event){
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value){
      this.filteruser( event.target.value );
    }else{
      this.getinstructor();
    }
  }
  handleEditClick(data){
    if(this.state.isEdittogged == true){
      Service.editNotificationtemplate(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.notification();
          this.setState({isEdittogged: 2, name: '', id : '', body : '',event : '', reciver_type : '' });
        }
      });
    }else{
      console.log(data);
      this.setState({isEdittogged: 1, name: data.name, id : data.id, body : data.body, event : data.event_type, reciver_type : data.reciver_type });
    }
  }

  handleAddClick(){
    Service.addNotificationtemplate(this.state).then(response => {
      console.log(response);
      if(response.ack){
        this.notification();
        this.setState({isEdittogged: 2, name: '', id : '', body : '',event : '', reciver_type : '' });
      }
    });
  }


  handleEdit(data){
    this.setState({isEdittogged: 0, name: '', id : '', body : '',event : '', reciver_type : '' });
  }

  render() {

    const categorydiv = this.state.isEdittogged == 1 ? (
      <Card>
        <CardHeader>
          <strong>Edit Notification</strong>
        </CardHeader>
        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Notification Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                
              </Col>
            </FormGroup>

            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Event:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="event" onChange={this.handleChange} value={this.state.event}>
                <option value='' >Select Event</option>
                <option value='1'>On user create</option>
                <option value='2'>On user signup</option>
                <option value='3'>X hours after user signup</option>
                <option value='4'>X hours after user signup and the user has not made a purchase</option>
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Receiver:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="reciver_type" onChange={this.handleChange} value={this.state.reciver_type}>
                <option value='' >Select Receiver</option>
                <option value='S'>Student</option>
                <option value='I'>Instructor</option>
                <option value='C'>Owner</option>
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Status:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="status" onChange={this.handleChange} value={this.state.status}>
                <option value='' >Select Status</option>
                <option value='1'>Active</option>
                <option value='0'>Inactive</option>
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Body</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="body" value={this.state.body} onChange={this.handleChange} id="textarea-input" rows="9"
                             placeholder="Content..." />
              </Col>
            </FormGroup>

          </Form>
        </CardBody>
        <CardFooter>
          <Button type="submit" size="sm" color="primary" onClick={this.handleEditClick}><i className="fa fa-dot-circle-o"></i> Update</Button> &nbsp;&nbsp;
          <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
        </CardFooter>
      </Card>
    ) : (
       this.state.isEdittogged == 0 ? (
          <Card>
            <CardHeader>
              <strong>Add Notification</strong>
            </CardHeader>
            <CardBody>
              


              <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Notification Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                
              </Col>
            </FormGroup>

            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Event:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="event" onChange={this.handleChange} value={this.state.event}>
                <option value='' >Select Event</option>
                <option value='1'>On user create</option>
                <option value='2'>On user signup</option>
                <option value='3'>X hours after user signup</option>
                <option value='4'>X hours after user signup and the user has not made a purchase</option>

              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Receiver:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="reciver_type" onChange={this.handleChange} value={this.state.reciver_type}>
                <option value='' >Select Receiver</option>
                <option value='S'>Student</option>
                <option value='I'>Instructor</option>
                <option value='C'>Owner</option>
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Status:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="status" onChange={this.handleChange} value={this.state.status}>
                <option value='' >Select Status</option>
                <option value='1'>Active</option>
                <option value='0'>Inactive</option>
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Body</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="body" value={this.state.body} onChange={this.handleChange} id="textarea-input" rows="9"
                             placeholder="Content..." />
              </Col>
            </FormGroup>

          </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleAddClick}><i className="fa fa-dot-circle-o"></i> Add Notification</Button> &nbsp;&nbsp;
              <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
            </CardFooter>
          </Card>
      ) : (
          <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Notification</strong>
                <div className="card-header-actions">
                    <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.handleEdit}>Add Notification</button>
                </div>
              </CardHeader>
              <CardBody>
              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>#</th>    
                    <th>Name</th>
                    <th>Event</th>
                    <th>Receiver</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{row.name} &nbsp;&nbsp;
                    {this.state.rows[i].is_active == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}
                    </td>
                    
                    {this.state.rows[i].event_type == 1 ? ( <td>On user create</td>
                    ) : (
                        this.state.rows[i].event_type == 2 ? ( <td>On user signup</td>
                        ):(
                          <td>Admin</td>
                        )
                        
                    )}
                    
                    {this.state.rows[i].reciver_type == 'S' ? (
                         <td>Student</td>
                    ) : (
                        this.state.rows[i].reciver_type == 'I' ? (
                          <td>Instructor</td>
                        ):(
                          <td>Admin</td>
                        )
                    )}
                    
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash-o"></i></Button>
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
    );

    return (
      <div className="animated fadeIn">
      {categorydiv}
      </div>
    );
  }
}

export default Notification;
