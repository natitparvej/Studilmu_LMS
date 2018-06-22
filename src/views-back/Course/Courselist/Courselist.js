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
    this.state = {lognUser: lognUser ,schoolid : lognUser.schoolid ,lecturerow : [], isLoggedIn: true,authors : [],courserow : [],ownerrows : [], categories : [], activeTab: '1', lecturename : '', lecturedesc : '',lecturesectionid: '',
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
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleownerChange = this.handleownerChange.bind(this);
    

    this.toggle = this.toggle.bind(this);
    this.authors = this.authors.bind(this);
    this.courses = this.courses.bind(this);
    this.authors();
    this.courses();

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

  courses(){
    Service.getCourses({schoolid:this.state.lognUser.schoolid}).then(response => {       
        if(response.ack == 1){
          console.log(response.course);
          this.setState({ courserow : response.course});
        }
    });
  }

  handleownerChange(event){
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value){
      this.filterCourse( event.target.value );
    }else{
      this.courses();
    }
  }

  filterCourse(user_id){
    //console.log(user_id);
    Service.filterCourse({ user_id : user_id }).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({ courserow : response.course });
      }else{
        this.setState({ rows: [] });
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

  handleEditClick(data){
    if(this.state.isEdittogged == true){
      Service.editcourse(this.state).then(response => {
        console.log(response);
        if(response.ack == 1){
          this.courses();
          this.setState({isEdittogged: false, name: '', id : '' });
        }
      });
    }else{
      this.setState({isEdittogged: true, name: data.name, id : data.id, description: data.description, category_id: data.category_id, user_id: data.user_id, code: data.code, price: data.price, time_limit: data.time_limit, certification:data.certification });
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
      
    const coursediv = this.state.isEdittogged ? (
      <Row>
          
          <Col xs="12" md="" className="mb-4">         
            
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Card>
              <CardHeader>
                <strong>Edit Course</strong>
              </CardHeader>
              <CardBody>

                <Form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" className="form-horizontal" >
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Owner Name:</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="select" name="user_id" onChange={this.handleChange} value={this.state.user_id}>
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
                    <Input type="select" name="category_id" onChange={this.handleChange} value={this.state.category_id}>
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

                  <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Status</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" id="is_active" name="is_active" onChange={this.handleChange} value={this.state.is_active}>
                      <option value='' disabled>Please Select</option>
                      <option value='1'>Active</option>
                      <option value='0'>Inactive</option>
                    </Input>
                  </Col>
                </FormGroup>      
                  

                </Form>
              </CardBody>
              <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleEditClick}><i className="fa fa-dot-circle-o"></i> Update</Button>
              </CardFooter>
            </Card>
              </TabPane>

            </TabContent>
          </Col>
          
        </Row>
    ):(
      <Row>
          <Col xs="12" md="12">
            <Card>
            <CardHeader>       
                <FormGroup row>
                <Col md="2">
                  <i className="fa fa-align-justify"></i><strong>Course List</strong>
                </Col>
                <Col xs="12" md="8">
                  <Input type="select" name="ownerid" onChange={this.handleownerChange} value={this.state.ownerid}>
                    <option value='' >Select Owner</option>
                    {this.state.ownerrows.map((row, i) =>
                    <option value={row.id} key={i}>{row.name}</option>
                    )}
                  </Input>
                </Col>                
                </FormGroup>
              </CardHeader>
              <CardBody>

              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Code</th>
                    <th>Price</th> 
                    <th>status</th>                  
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.courserow.map((row, i) =>
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.c_name}</td>
                    <td>{row.code}</td>
                    <td>{row.price}</td>
                    <td>
                    {row.is_active == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}
                      
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>
                      <Button color="danger" size="sm" onClick={() => this.handleDeleteClick(row.id)}><i className="fa fa-trash-o"></i></Button>
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
                
                </CardBody>
              
            </Card>
          </Col>
          
        </Row>
    );
    return (
      <div className="animated fadeIn">
          {coursediv}
        </div>
      ); 


  }
}

export default Courselist;
