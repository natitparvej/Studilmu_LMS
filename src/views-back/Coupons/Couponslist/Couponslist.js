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
import Service from './../couponlistService.js';
function disablePrevDates(startDate) {
  const startSeconds = Date.parse(startDate);
  return (date) => {
    return Date.parse(date) < startSeconds;
  }
}
class Couponslist extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {name: '', visible: false, msg : '', ownerrows : [], rows: [],
                  isEdittogged : 2,name: '', id : '', code : '',percentage : '', endDate :moment(),startDate: moment(),status:'',
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.notification = this.notification.bind(this);
    this.handledateChange = this.handledateChange.bind(this);
    this.notification();
  }
  
  notification(){
    console.log(this.state);
    Service.getCoupon().then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ rows : response.Coupon, name: ''});
        }
    });
  }

  handleChange(Coupon) {
     const value = Coupon.target.type === 'checkbox' ? Coupon.target.checked : Coupon.target.value;
    this.setState({ [Coupon.target.name]:value});
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
  handleEditClick(data){
    if(this.state.isEdittogged == true){
      console.log(this.state);
      Service.editCoupon(this.state).then(response => {
        //console.log(response);
        if(response.ack){
          this.notification();
          this.showalert('Coupon Edited successfully!');
          this.setState({isEdittogged: 2, name: '', id : '', code : '',percentage : '', endDate :moment(),startDate: moment(),status:'',msg : 'Coupon Edited successfully' });
        }
      });
    }else{
      console.log(data);
      this.setState({isEdittogged: 1, name: data.name, id : data.id, code : data.code, startDate:moment(data.start_date),endDate:moment(data.end_date),percentage : data.percentage,status:data.is_active});
    }
  }
  handleDeleteClick(data){
     console.log(data);
      Service.deleteCoupon(data).then(response => {
        //console.log(response);
        if(response.ack){
          this.notification();
          this.showalert('Coupon Deleted successfully');
          this.setState({isEdittogged: 2, name: '', id : '', code : '',percentage : '', endDate :moment(),startDate: moment(),status:'',msg : 'Coupon Deteled successfully!' });
        }
      });
  }
  handleAddClick(){
    console.log('i am here');
    Service.addCoupon(this.state).then(response => {
      console.log(response);
      if(response.ack){
        this.notification();
        this.showalert('Coupon Added successfully!');
          this.setState({isEdittogged: 2, name: '', id : '', code : '',percentage : '', endDate :moment(),startDate: moment(),status:'',msg : 'Coupon Added successfully!' });
      }
    });
  }

  onChange = time => this.setState({ time });

  handleEdit(data){
          this.setState({isEdittogged:0, name: '', id : '', code : '',percentage : '', endDate :moment(),startDate: moment(),status:'' });
  }

  render() {
const minDate = new Date(Date.now());
    const categorydiv = this.state.isEdittogged == 1 ? (
      <Card>
        <CardHeader>
          <strong>Edit Coupon</strong>
        </CardHeader>
        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Coupon Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. '25% discount'" />    
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Coupon Code</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="code" value={this.state.code} onChange={this.handleChange} id="text-input" placeholder="e.g. 'june325435345'" />    
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Start Date</Label>
              </Col>
              <Col xs="12" md="5">
                <DatePicker selected={this.state.startDate} minDate={minDate} id="startDate"  onChange={this.handledateChange} />
              </Col>
            </FormGroup>
             <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">End Date</Label>
              </Col>
              <Col xs="12" md="5">
                <DatePicker selected={this.state.endDate} minDate={minDate} id="endDate" onChange={this.handledateChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">percentage</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="text" name="percentage" value={this.state.percentage} onChange={this.handleChange} id="text-input" placeholder="e.g. 30" required/>    
              </Col>
            </FormGroup>
         <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Status</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="checkbox" name="status" defaultChecked={this.state.status} onChange={this.handleChange}   id="status"  /> Yes
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
              <strong>Add Coupon</strong>
            </CardHeader>
            <CardBody>
              
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Coupon Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. '25% discount" required/>    
              </Col>
            </FormGroup>
           <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Coupon Code</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="code" value={this.state.code} onChange={this.handleChange} id="text-input" placeholder="e.g. 'June2345667'" required/>    
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Start Date</Label>
              </Col>
              <Col xs="12" md="5">
                <DatePicker selected={this.state.startDate} id="startDate" minDate={minDate} onChange={this.handledateChange} />
              </Col>
            </FormGroup>
          <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">End Date</Label>
              </Col>
              <Col xs="12" md="5">
                <DatePicker selected={this.state.endDate} id="endDate" minDate={minDate} onChange={this.handledateChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Percentage</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="text" name="percentage" value={this.state.percentage} onChange={this.handleChange} id="text-input" placeholder="e.g. 'percentage of discount'" required/>    
              </Col>
            </FormGroup>
         <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Status</Label>
              </Col>
              <Col xs="12" md="7">
                <Input type="checkbox" name="status" value={this.state.status} onChange={this.handleChange} id="text-input"  /> Yes
              </Col>
            </FormGroup>
          </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleAddClick}><i className="fa fa-dot-circle-o"></i> Add Coupon</Button> &nbsp;&nbsp;
              <Button type="submit" size="sm" color="primary" onClick={() => this.setState({isEdittogged : 2})}>Cancel</Button>
            </CardFooter>
          </Card>
      ) : (
          <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>

                <FormGroup row>
                <Col md="2">
                  <i className="fa fa-align-justify"></i><strong>  Coupon</strong>
                </Col>
                <Col xs="12" md="8">
                </Col>
                <Col xs="12" md="2">
                  <div className="card-header-actions">
                    <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.handleEdit}>Add Coupon</button>
                  </div>
                </Col>
                </FormGroup>


              </CardHeader>
              <CardBody>
              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>#</th>    
                    <th>Coupon Name</th>
                    <th>Coupon Code</th>
                    <th>Coupon Percentage</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{row.name} </td>
                    <td>{row.code} </td>
                    <td>{row.percentage} %</td>
                    {row.is_active==1? (
                         <td>Active</td>
                    ) :(
                          <td>Inactive</td>
                        )
                    }
                    
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>&nbsp;
                      <Button color="danger" size="sm" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDeleteClick(row)} }><i className="fa fa-trash-o"></i></Button>
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

export default Couponslist;
