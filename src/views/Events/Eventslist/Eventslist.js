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
import Service from './../eventlistService.js';

class Eventslist extends Component {
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
    Service.getEvent({user_id : this.state.lognUser.id }).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ rows : response.event, name: ''});
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
      Service.editEvent(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.notification();
          this.setState({isEdittogged: 2, name: '', id : '', desc : '',audience : '', duration : '',startDate: moment(), time: '10:00' });
        }
      });
    }else{
      console.log(data);
      this.setState({isEdittogged: 1, name: data.title, id : data.id, desc : data.description, startDate:moment(data.date), time: new Date(data.date).toLocaleTimeString(), audience : data.audience, duration : data.duration });
    }
  }

  handleAddClick(){
    Service.addEvent(this.state).then(response => {
      console.log(response);
      if(response.ack){
        this.notification();
        this.setState({isEdittogged: 2, name: '', id : '', desc : '',audience : '', duration : '',startDate: moment(), time: '10:00' });
      }
    });
  }

  onChange = time => this.setState({ time });

  handleEdit(data){
    this.setState({isEdittogged: 0, name: '', id : '', desc : '',audience : '', duration : '',startDate: moment(), time: '10:00' });
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
                <Label htmlFor="text-input">Event Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Date</Label>
              </Col>
              <Col xs="12" md="5">
                <DatePicker selected={this.state.startDate} onChange={this.handledateChange} />
              </Col>
              <Col md="1">
                <Label htmlFor="text-input">Time</Label>
              </Col>
              <Col xs="12" md="3">
                <TimePicker onChange={this.onChange} value={this.state.time}/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Duration</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="text" name="duration" value={this.state.duration} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Audience:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="audience" onChange={this.handleChange} value={this.state.audience}>
                <option value='' >Select Audience</option>
                <option value='P'>This is a private event</option>
                <option value='S'>Only specific users can see this event</option>
                <option value='A'>Everybody can see this event</option>
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Description</Label>
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
              <strong>Add Event</strong>
            </CardHeader>
            <CardBody>
              
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Event Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Date</Label>
              </Col>
              <Col xs="12" md="5">
                <DatePicker selected={this.state.startDate} onChange={this.handledateChange} />
              </Col>
              <Col md="1">
                <Label htmlFor="text-input">Time</Label>
              </Col>
              <Col xs="12" md="3">
                <TimePicker onChange={this.onChange} value={this.state.time}/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Duration</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="text" name="duration" value={this.state.duration} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Audience:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="select" name="audience" onChange={this.handleChange} value={this.state.audience}>
                <option value='' >Select Audience</option>
                <option value='P'>This is a private event</option>
                <option value='S'>Only specific users can see this event</option>
                <option value='A'>Everybody can see this event</option>
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="desc" value={this.state.desc} onChange={this.handleChange} id="textarea-input" rows="9"
                             placeholder="Content..." />
              </Col>
            </FormGroup>

          </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleAddClick}><i className="fa fa-dot-circle-o"></i> Add Event</Button> &nbsp;&nbsp;
              <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
            </CardFooter>
          </Card>
      ) : (
          <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Event</strong>
                <div className="card-header-actions">
                    <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.handleEdit}>Add Event</button>
                </div>
              </CardHeader>
              <CardBody>
              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>#</th>    
                    <th>Event Title</th>
                    <th>Date</th>
                    <th>Audience</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{row.title} </td>
                    
                    <td>{ new Date(row.date).toDateString()+' '+new Date(row.date).toLocaleTimeString()  }</td>
                    
                    {this.state.rows[i].audience == 'P' ? (
                         <td>This is a private event</td>
                    ) : (
                        this.state.rows[i].audience == 'S' ? (
                          <td>Only specific users can see this event</td>
                        ):(
                          <td>Everybody can see this event</td>
                        )
                    )}
                    
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

export default Eventslist;
