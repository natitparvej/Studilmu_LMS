import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem,} from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../courseService.js';

class Courselist extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,schoolid : lognUser.schoolid ,lecturerow : [], isLoggedIn: true,authors : [],courserow : [],activeTab: '1', lecturename : '', lecturedesc : '',lecturesectionid: '',
                  corseid: '',corsename: '',corsesubtitle: '', corsedesc : '', corsebioid: '', visible: false, msg : '', rows: [],
                  fullname : '', headline : '' ,bio : ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlebioSubmit = this.handlebioSubmit.bind(this);
    this.handlelectureSubmit = this.handlelectureSubmit.bind(this);

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLecture = this.handleLecture.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleLecture = this.toggleLecture.bind(this);
    

    this.toggle = this.toggle.bind(this);
    this.authors = this.authors.bind(this);
    this.courses = this.courses.bind(this);
    this.authors();
    this.courses();
  }

  courses(){
    Service.getCourses({schoolid:this.state.lognUser.schoolid}).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ courserow : response.course});
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

  handleLecture(data) {
    this.props.history.push('/course/lecture/'+data.id);
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

  handlelectureSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if(!this.state.corsename){
      this.showalert('Enter Name'); return ;
    }
    
      Service.addLecture(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({lecturename : '', lecturedesc : '',lecturesectionid: '',});
          this.toggleLecture();
          this.toggle("2");
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if(!this.state.corsename){
      this.showalert('Enter Course Name'); return ;
    }
    if(!this.state.corsebioid){
      this.showalert('Enter Author Information'); return ;
    }
    if(!this.state.corsesubtitle){
      this.showalert('Enter Course Subtitle'); return ;
    }
    if(!this.state.corsedesc){
      this.showalert('Enter Course Description'); return ;
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

  toggleLecture() {
    this.setState({ modalLecture: !this.state.modalLecture,});
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
    if(tab == 2){
      Service.getLectures({courseid : this.state.corseid }).then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ lecturerow : response.coursesection});
        }else{
          this.setState({ lecturerow : []});
        }
      });
    }
  }

  handleLoginClick(data){
    console.log(data);
    if(this.state.isLoggedIn == true){
      this.setState({isLoggedIn: false, corseid: data.id, corsename: data.coursename ,corsesubtitle: data.subtitle, corsedesc : data.description, corsebioid: data.authorid});
    }else{
      this.setState({isLoggedIn: true, activeTab: '1'});
    }
  }


  render() {
    const button = this.state.isLoggedIn ? (
      <input type="submit" onClick={this.handleLoginClick} value="Details"/>
    ) : (
      <input type="submit" onClick={this.handleLoginClick} value="All Course"/>
    );

    const coursediv = this.state.isLoggedIn ? (
      <Row>
          {this.state.courserow.map((row, i) =>
            <Col xs="12" sm="6" md="4" key={i} onClick={() => this.handleLoginClick(row)}>
              <Card>
                <CardHeader>
                  {row.coursename}
                  <Badge color="success" className="float-right">Success</Badge>
                </CardHeader>
                <CardBody>
                  {row.description}
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
    ) : (
      <Row>
          
          <Col xs="12" md="" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                  <i className="icon-calculator"></i> Edit information
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                  <i className="icon-basket-loaded"></i> Add curriculum
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
                  <i className="icon-pie-chart"></i> Add a price
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
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="corsename" value={this.state.corsename} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                      <FormText color="muted">This is a help text</FormText>
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
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Edit Course</Button>
              </CardFooter>
            </Card>
              </TabPane>

              <TabPane tabId="2">
                <a aria-pressed="true" className="btn btn-info btn-block active" onClick={this.toggleLecture}>New Lecture</a>
                {this.state.lecturerow.map((row, i) =>
                <ListGroup key={i}>
                  <ListGroupItem active action>{row.title} </ListGroupItem>
                    {row.lecture.map((itemrow, i) =>
                      <ListGroupItem onClick={() => this.handleLecture(itemrow)} action key={i}>{itemrow.lecturename}</ListGroupItem>
                    )}
                </ListGroup>
                )}

              </TabPane>

              <TabPane tabId="3">
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Plan Type</th>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>Recurring</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.firstname +' '+ row.lastname}</td>
                    <td>{row.email}</td>
                    <td>{row.joindate}</td>
                    <td>{row.joindate}</td>
                    <td>$ {row.price}</td>
                    
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                    
                  </tr>

                  )}

                  </tbody>
                </Table>
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

                <Modal isOpen={this.state.modalLecture} toggle={this.toggleLecture}
                       className={'modal-info ' + this.props.className}>
                  
                  <ModalHeader toggle={this.toggleLecture}>Add Lecture</ModalHeader>
                  <form onSubmit={this.handlelectureSubmit}>
                      <ModalBody>

                          <p className="text-muted"></p>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                            </InputGroupAddon>
                            <Input type="text" placeholder="Lecture name" name="lecturename" value={this.state.lecturename} onChange={this.handleChange}/>
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                            </InputGroupAddon>
                            <Input type="select" id="lecturesectionid" name="lecturesectionid" onChange={this.handleChange} value={this.state.lecturesectionid}>
                              <option value='' disabled>Please Select</option>
                              {this.state.lecturerow.map((row, i) =>
                              <option value={row.id} key={i}>{row.title}</option>
                              )}
                            </Input>
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                            </InputGroupAddon>
                            <Input type="text" placeholder="Description" name="lecturedesc" value={this.state.lecturedesc} onChange={this.handleChange}/>
                          </InputGroup>
                      
                      </ModalBody>
                      <ModalFooter>
                        <Button color="info" type="submit">Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleLecture}>Cancel</Button>
                      </ModalFooter>
                  </form>

                </Modal>
            </TabContent>
          </Col>
          
        </Row>
    );


    return (
      <div className="animated fadeIn">
      {button}
      {coursediv}
      </div>
    );



  }
}

export default Courselist;
