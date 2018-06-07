import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem, } from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../cmsService.js';

class Settings extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,schoolid : lognUser.schoolid ,authors : [],activeTab: '1',corsename: '',corsesubtitle: '', corsedesc : '', corsebioid: '', visible: false, msg : '', rows: [], fullname : '', headline : '' ,bio : ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlebioSubmit = this.handlebioSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggle = this.toggle.bind(this);
    this.authors = this.authors.bind(this);
    this.authors();
  }

  authors(){
    // Service.getAuthors({schoolid:this.state.lognUser.schoolid}).then(response => {
    //     console.log(response);
    //     if(response.ack){
    //       this.setState({ authors : response.authors,fullname : '', headline : '' ,bio : ''});
    //     }
    // });
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
    console.log(this.state);
    if(!this.state.corsename){
      this.showalert('Enter Course Name'); return 1;
    }
    if(!this.state.corsebioid){
      this.showalert('Enter Author Information'); return 1;
    }
    if(!this.state.corsesubtitle){
      this.showalert('Enter Course Subtitle'); return 1;
    }
    if(!this.state.corsedesc){
      this.showalert('Enter Course Description'); return 1;
    }
    console.log(this.state);
      Service.addcourse(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ corsename : '',corsebioid : '', corsesubtitle : '' ,corsedesc : '', activeTab : '2'});
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
            <Card>
              <CardHeader>
                <strong>New Course</strong>
              </CardHeader>
              <CardBody>

                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="corsename" value={this.state.corsename} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="corsename" value={this.state.corsename} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="corsename" value={this.state.corsename} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="corsename" value={this.state.corsename} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Bio</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input type="select" id="corsebioid" name="corsebioid" onChange={this.handleChange} value={this.state.corsebioid}>
                        <option value='' disabled>Please Select</option>
                        {this.state.authors.map((row, i) =>
                        <option value={row.id} key={i}>{row.fullname}</option>
                        )}
                      </Input>
                    </Col>
                    <Col xs="12" md="2">
                      <a aria-pressed="true" className="btn btn-info btn-block active" onClick={this.toggleSuccess}>New Bio</a>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Subtitle</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="corsesubtitle" value={this.state.corsesubtitle} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Everything you need to know about video editing'" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="corsedesc" value={this.state.corsedesc} onChange={this.handleChange} id="textarea-input" rows="9"
                             placeholder="Content..." />
                    </Col>
                  </FormGroup>

                </Form>

              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Create Course</Button>
              </CardFooter>
            </Card>
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default Settings;
