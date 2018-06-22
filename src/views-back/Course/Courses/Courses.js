import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem, } from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../courseService.js';

class Courses extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,user_id : '' , authors : [], ownerrows : [], categories : [], activeTab: '1', name: '', description : '', code: '', price: '', visible: false, msg : '', rows: [], 	time_limit : '', certification : '' ,certification_duration : ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlebioSubmit = this.handlebioSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggle = this.toggle.bind(this);
    this.authors = this.authors.bind(this);
    this.authors();

    Service.getOwners().then(response => {
      console.log(response);
      if(response.students){
        this.setState({ ownerrows: response.students });        
      }
    },err =>{
      console.log(err);
    });

    Service.getCategory().then(response => {
      
      if(response.category){
        this.setState({ categories: response.category });
              
      }
    },err =>{
      console.log(err);
    });

  }

  authors(){
    Service.getAuthors({schoolid:this.state.lognUser.schoolid}).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ authors : response.authors,fullname : '', headline : '' ,bio : ''});
        }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlebioSubmit(event) {
    event.preventDefault();
    if(!this.state.fullname){
      this.showalert('Enter Firstname and Lastname'); return 1;
    }
    console.log(this.state);
      Service.addAuthors(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.toggleSuccess();
          this.authors();
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state);
    if(!this.state.name){
      this.showalert('Enter Course Name.'); return 1;
    }
    if(!this.state.description){
      this.showalert('Enter Course Description.'); return 1;
    }
   
    console.log(this.state);
      Service.addcourse(this.state).then(response => {
        console.log(response.ack);
        if(response.ack == 1){
          this.props.history.push("/course/courselist");
          this.showalert('Course Added Successfully.');
          this.setState({ name : '', description : '', category_id : '' , user_id : '', code : '', price :''});
        }else{          
          this.showalert('Course Not added');
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          
          <Col xs="12" md="" className="mb-4">         
            
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Card>
              <CardHeader>
                <strong>Add Course</strong>
              </CardHeader>
              <CardBody>

                <Form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" className="form-horizontal" >
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Owner Name:</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="select" name="user_id" onChange={this.handleChange} value={this.state.parentid}>
                      <option value='' >Select Owner</option>
                      {this.state.ownerrows.map((row, i) =>
                      <option value={row.id} key={i}>{row.name}</option>
                      )}
                    </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Category:</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="select" name="category_id" onChange={this.handleChange} value={this.state.parentid}>
                      <option value='' >Select Category</option>
                      {this.state.categories.map((row, i) =>
                      <option value={row.id} key={i}>{row.name}</option>
                      )}
                    </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Course name:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Enter Course name.'" />                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Description:</Label>
                    </Col>
                    <Col xs="12" md="9">
                     <Input type="textarea" name="description" value={this.state.description} onChange={this.handleChange} id="textarea-input" rows="9"
                             placeholder="Content..." />
                    </Col>                    
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Code:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="code" value={this.state.code} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Enter Course code.'" />                      
                    </Col>
                  </FormGroup>    
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Price:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="price" value={this.state.price} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Enter Course price.'" />                      
                    </Col>
                  </FormGroup>    
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Time limit:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="time_limit" value={this.state.time_limit} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Enter course time limit.'" />                      
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Certification:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="certification" value={this.state.certification} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Enter course certification.'" />                      
                    </Col>
                  </FormGroup>

                  

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Create Course</Button>
              </CardFooter>
            </Card>
              </TabPane>

            </TabContent>
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default Courses;
