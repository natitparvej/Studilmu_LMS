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
import Service from './../settingService.js';

class Subspackage extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser , visible: false, msg : '',  name : '', plan: '', billing_duration:'', no_of_user:'', course:'', single_signon:'', custom_report:'', automation:'',  success_message : '', ssl_domain : '', price : '', no_of_course:'', is_active:'', rows:[]};
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.package = this.package.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleownerChange = this.handleownerChange.bind(this);
    this.handledateChange = this.handledateChange.bind(this);
    this.package();
  
  }
  
  package(){  
    Service.getPackage().then(response => {
        console.log(response);
        if(response.ack){          
          this.setState({ rows : response.template});
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
      Service.updatePackage(this.state).then(response => {
        console.log(response);
        if(response.ack){  
          this.package();
          this.setState({isEdittogged: 2, name: '', id : '' });
          
        }
      });
    }else{
      console.log(data);
      this.setState({isEdittogged: 1,id:data.id, name: data.name, plan: data.plan, billing_duration: data.billing_duration, no_of_user: data.no_of_user, course: data.course, single_signon: data.single_signon, custom_report: data.custom_report, automation: data.automation, success_message: data.success_message, ssl_domain: data.ssl_domain,price: data.price, no_of_course: data.no_of_course, is_active: data.is_active });
    }
  }

  handleDeleteClick(id){    
    Service.deletePackage({id : id}).then(response => {
      console.log(response);
      if(response.ack){
        this.package();
      }
    });
  }

  handleAddClick(){
    console.log(this.state);
    Service.addPackage(this.state).then(response => {
      console.log(response);
      if(response.ack){
        this.package();
        this.setState({isEdittogged: 2, name: '', id : '' });        
      }
    });
  }

  onChange = time => this.setState({ time });

  handleEdit(data){
    this.setState({isEdittogged: 0, name: '', id : ''});
  }

  render() {

    const categorydiv = this.state.isEdittogged == 1 ? (
      <Card>
        <CardHeader>
          <strong>Edit Package</strong>
        </CardHeader>
        <CardBody>
        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Package Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Package name'" />    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Plans</Label>
              </Col>
              <Col xs="12" md="5">
              <Input type="select" name="plan" onChange={this.handleChange} value={this.state.plan}>
                <option value=''>Select Plan</option>
                <option value='S'>Standard Plans</option>
                <option value='U'>Unlimited Plans</option>
              </Input>
              </Col>              
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Duration</Label>
              </Col>
              <Col xs="12" md="5">
              <Input type="select" name="billing_duration" onChange={this.handleChange} value={this.state.billing_duration}>
                <option value=''>Select Plan</option>
                <option value='A'>Annual Pricing</option>
                <option value='M'>Monthly Pricing</option>
              </Input>
              </Col>              
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">No Of User</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="text" name="no_of_user" value={this.state.no_of_user} onChange={this.handleChange} id="text-input" placeholder="e.g. 'No of user'" />    
              </Col>
            </FormGroup>
           
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Course</Label>
              </Col>
              <Col xs="12" md="5">
              <Input type="select" name="course" onChange={this.handleChange} value={this.state.course}>               
                <option value='L'>Limited</option>
                <option value='U'>Unlimited</option>
              </Input>
              </Col>              
            </FormGroup>

             <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">No Of Course</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="text" name="no_of_course" value={this.state.no_of_course} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Price'" />     
              </Col>
            </FormGroup>

             <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Single Sign-On support</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="single_signon" onChange={this.handleChange} value={this.state.single_signon}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Custom Report</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="custom_report" onChange={this.handleChange} value={this.state.custom_report}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Automation</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="automation" onChange={this.handleChange} value={this.state.automation}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Success Message</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="success_message" onChange={this.handleChange} value={this.state.success_message}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">SSL Domain</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="ssl_domain" onChange={this.handleChange} value={this.state.ssl_domain}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Price</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="text" name="price" value={this.state.price} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Price'" />     
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Status</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="is_status" onChange={this.handleChange} value={this.state.is_status}>               
                <option value='1'>Active</option>
                <option value='0'>Deactive</option>
              </Input>    
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
              <strong>Add Package</strong>
            </CardHeader>
            <CardBody>
              
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Package Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Package name'" />    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Plans</Label>
              </Col>
              <Col xs="12" md="5">
              <Input type="select" name="plan" onChange={this.handleChange} value={this.state.plan}>
                <option value=''>Select Plan</option>
                <option value='S'>Standard Plans</option>
                <option value='U'>Unlimited Plans</option>
              </Input>
              </Col>              
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Duration</Label>
              </Col>
              <Col xs="12" md="5">
              <Input type="select" name="billing_duration" onChange={this.handleChange} value={this.state.billing_duration}>
                <option value=''>Select Plan</option>
                <option value='A'>Annual Pricing</option>
                <option value='M'>Monthly Pricing</option>
              </Input>
              </Col>              
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">No Of User</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="text" name="no_of_user" value={this.state.no_of_user} onChange={this.handleChange} id="text-input" placeholder="e.g. 'No of user'" />    
              </Col>
            </FormGroup>           

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Course</Label>
              </Col>
              <Col xs="12" md="5">
              <Input type="select" name="course" onChange={this.handleChange} value={this.state.course}>               
                <option value='L'>Limited</option>
                <option value='U'>Unlimited</option>
              </Input>
              </Col>              
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">No Of Course</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="text" name="no_of_course" value={this.state.no_of_course} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Price'" />     
              </Col>
            </FormGroup>

             <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Single Sign-On support</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="single_signon" onChange={this.handleChange} value={this.state.single_signon}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Custom Report</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="custom_report" onChange={this.handleChange} value={this.state.custom_report}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Automation</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="automation" onChange={this.handleChange} value={this.state.automation}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Success Message</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="success_message" onChange={this.handleChange} value={this.state.success_message}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">SSL Domain</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="select" name="ssl_domain" onChange={this.handleChange} value={this.state.ssl_domain}>               
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Input>    
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Price</Label>
              </Col>
              <Col xs="12" md="7">
              <Input type="text" name="price" value={this.state.price} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Price'" />     
              </Col>
            </FormGroup>

           

          </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleAddClick}><i className="fa fa-dot-circle-o"></i> Add Package</Button> &nbsp;&nbsp;
              <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
            </CardFooter>
          </Card>
      ) : (
          <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Package List</strong>
                <div className="card-header-actions">
                    <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.handleEdit}>Add Package</button>
                </div>
              </CardHeader>
              <CardBody>
              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>#</th>    
                    <th>Name</th>
                    <th>Plan</th>
                    <th>Duration</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{i+1}.</td>
                    <td>{row.name} </td>       
                                      
                    {row.plan == 'S' ? (
                         <td>Standard Plans</td>
                    ) : (
                      <td>Unlimited Plans</td>
                    )}

                    {row.billing_duration == 'A' ? (
                         <td>Annual Pricing</td>
                    ) : (
                        <td>Monthly Pricing</td>
                    )}
                    
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
    );

    return (
      <div className="animated fadeIn">
      {categorydiv}
      </div>
    );
  }
}

export default Subspackage;
