import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem, } from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../courseService.js';

class Lecture extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser,schoolid : lognUser.schoolid ,lecturerow : [], lectureid : this.props.match.params.id, authors : [],activeTab: '1',lecturename: '',corsesubtitle: '', lecturedesc : '', corsesectionid: '', visible: false, msg : '', rows: [], fullname : '', headline : '' ,bio : ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlebioSubmit = this.handlebioSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);

    this.toggle = this.toggle.bind(this);
    this.authors = this.authors.bind(this);
    this.getlecture = this.getlecture.bind(this);
    this.authors();
    this.getlecture();

    Service.getLecturedetails({lectureid : this.props.match.params.id }).then(response => {
      console.log(response);
      var lecture = response.lecture;
      if(response.ack){
        this.setState({ lecturename: lecture.lecturename , lecturedesc : lecture.description, corsesectionid: lecture.coursessectionid });
      }else{
        this.showalert('Existed');
      }
    });
  }

    getlecture(){
      Service.getLectures({courseid : this.props.match.params.id }).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ lecturerow : response.coursesection});
        }else{
          this.showalert('  Existed');
        }
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
    console.log(this.state);
    if(!this.state.lecturename){
      this.showalert('Enter Course Name'); return 1;
    }
    if(!this.state.corsesectionid){
      this.showalert('Enter Author Information'); return 1;
    }
    if(!this.state.corsesubtitle){
      this.showalert('Enter Course Subtitle'); return 1;
    }
    if(!this.state.lecturedesc){
      this.showalert('Enter Course Description'); return 1;
    }
    console.log(this.state);
      Service.addcourse(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ lecturename : '',corsesectionid : '', corsesubtitle : '' ,lecturedesc : '', activeTab : '2'});
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
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                  <i className="icon-calculator"></i> Lecture information
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                  <i className="icon-basket-loaded"></i> User
                </NavLink>
              </NavItem>
            </Nav>
            
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Card>
              <CardHeader>
                <strong>New Course</strong>
              </CardHeader>
              <CardBody>

                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Lecture Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="lecturename" value={this.state.lecturename} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Lecture Section</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input type="select" id="corsesectionid" name="corsesectionid" onChange={this.handleChange} value={this.state.corsesectionid}>
                        <option value='' disabled>Please Select</option>
                        {this.state.lecturerow.map((row, i) =>
                        <option value={row.id} key={i}>{row.title}</option>
                        )}
                      </Input>
                    </Col>
                    <Col xs="12" md="2">
                      <a aria-pressed="true" className="btn btn-info btn-block active" onClick={this.toggleSuccess}>New Section</a>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="lecturedesc" value={this.state.lecturedesc} onChange={this.handleChange} id="textarea-input" rows="9"
                             placeholder="Content..." />
                    </Col>
                  </FormGroup>

                </Form>

              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Create Course</Button>
              </CardFooter>
            </Card>
              </TabPane>

              <TabPane tabId="2">
                
                

              </TabPane>

              <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-info ' + this.props.className}>
                  
                  <ModalHeader toggle={this.toggleSuccess}>Add Bio</ModalHeader>
                  <form onSubmit={this.handlebioSubmit}>
                      <ModalBody>

                          <p className="text-muted">If no password is given, students will receive an email to confirm their account and set a password.</p>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                            </InputGroupAddon>
                            <Input type="text" placeholder="Fullname" name="fullname" value={this.state.fullname} onChange={this.handleChange}/>
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                            </InputGroupAddon>
                            <Input type="text" placeholder="Headline" name="headline" value={this.state.headline} onChange={this.handleChange}/>
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                            </InputGroupAddon>
                            <Input type="text" placeholder="Bio" name="bio" value={this.state.bio} onChange={this.handleChange}/>
                          </InputGroup>
                      
                      </ModalBody>
                      <ModalFooter>
                        <Button color="info" type="submit">Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleSuccess}>Cancel</Button>
                      </ModalFooter>
                  </form>

                </Modal>
            </TabContent>
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default Lecture;
