import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem, } from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../emailService.js';

class Templates extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,user_id : lognUser.schoolid, name: '', visible: false, msg : '', ownerrows : [], rows: [],
                  isEdittogged : 2, startDate: moment(), time: '10:00', name : '', audience : '', desc : '', duration : '',
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.notification = this.notification.bind(this);
    this.handleownerChange = this.handleownerChange.bind(this);
    this.handledateChange = this.handledateChange.bind(this);
    this.notification();
  
  }
  
  notification(){
    console.log(this.state);
    Service.getEmailtemplte().then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ rows : response.cmsdata, name: ''});
        }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handledateChange(date){
    this.setState({ startDate: date });
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
      Service.editCms(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.notification();
          this.setState({isEdittogged: 2, name: '', id : '', desc : '',meta_title : '', meta_desc : '', meta_key : '' });
        }
      });
    }else{
      console.log(data);
      this.setState({isEdittogged: 1, name: data.title, id : data.id, desc : data.body, status: data.is_active });
    }
  }

  handleAddClick(){
    Service.addEmailtemplte(this.state).then(response => {
      console.log(response);
      if(response.ack){
        this.notification();
        this.setState({isEdittogged: 2, name: '', desc: '', status: ''});
      }
    });
  }

  onChange = time => this.setState({ time });

  handleEdit(data){
    this.setState({isEdittogged: 0, name: '', id : '', desc : '',meta_title : '', meta_desc : '', meta_key : '', });
  }

  render() {

    const categorydiv = this.state.isEdittogged == 1 ? (
      <Card>
        <CardHeader>
          <strong>Edit Event</strong>
        </CardHeader>
        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Subject</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="" />    
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
                  <Input type="textarea" name="desc" value={this.state.desc} onChange={this.handleChange} id="textarea-input" rows="9"
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
              <strong>Email Templates</strong>
            </CardHeader>
            <CardBody>
              
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Subject</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="" />    
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
                  <Input type="textarea" name="desc" value={this.state.desc} onChange={this.handleChange} id="textarea-input" rows="9"
                               placeholder="Content..." />
                </Col>
              </FormGroup>
            </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleAddClick}><i className="fa fa-dot-circle-o"></i> Add</Button> &nbsp;&nbsp;
              <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
            </CardFooter>
          </Card>
      ) : (
          <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Email Templates</strong>
                <div className="card-header-actions">
                   <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.handleEdit}>Add Templates</button>
                </div>
              </CardHeader>
              <CardBody>
              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{row.subject} </td>
                    <td>{this.state.rows[i].is_active == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}</td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>&nbsp;
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

export default Templates;
