import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Form, Label } from 'reactstrap';
import { Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import FileDrop from 'react-file-drop';
import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../groupService.js';

class Groupinfo extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser , name: '',desc: '', isactive : '', price : '', groupkey : '',
                  ownerid : '', instructorid : '', ownerrows : [], instructorows : [], activeTab: '1',
                  visible: false, msg : '', studentrows: [], courserows: [], filerows : []
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    
    this.handleinstrotrChange = this.handleinstrotrChange.bind(this);
    this.getcourse = this.getcourse.bind(this);
    this.getstudent = this.getstudent.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.toggle = this.toggle.bind(this);
    
    this.handleStudentClick = this.handleStudentClick.bind(this);
    this.handleCourseClick = this.handleCourseClick.bind(this);
    this.getfiles = this.getfiles.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.getstudent();
    this.getcourse();
    this.getfiles();
    Service.getOwners().then(response => {
      console.log(response);
      if(response.students){
        this.setState({ ownerrows: response.students });
      }
    },err =>{
      console.log(err);
    });

    console.log(this.props.match.params.id);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  getstudent(){
    Service.getStudents({schoolid : this.state.lognUser.schoolid, usertype : "S" }).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({ studentrows: response.template, name: '', usertype : 3,email: '', password : '', repassword : '' });
      }else{
        this.setState({ studentrows: [] });
      }
    },err =>{
      console.log(err);
    });
  }

  getfiles(){
    Service.getFiles({groupid: this.props.match.params.id }).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({ filerows: response.template, name: '', usertype : 3,email: '', password : '', repassword : '' });
      }else{
        this.setState({ filerows: [] });
      }
    },err =>{
      console.log(err);
    });
  }

  getcourse(){
    Service.getCourses({schoolid : this.state.lognUser.schoolid, usertype : "S" }).then(response => {
      console.log(response);
      if(response.ack){
        this.setState({ courserows: response.course, name: '', usertype : 3,email: '', password : '', repassword : '' });
      }else{
        this.setState({ courserows: [] });
      }
    },err =>{
      console.log(err);
    });
  }

  handleDrop = (files, event) => {
    console.log(files, event);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    // axios.post('http://localhost:8000/upload', data)
    //   .then(function (response) {
    // this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  handleinstrotrChange(event){
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value){
      this.filterStudent( event.target.value );
    }else{
      this.getstudent();
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.name){
      this.showalert('Enter Group Name'); return 1;
    }
    
    console.log(this.state);
      Service.addGroup(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.getstudent();
        }else{
          this.showalert('Error Adding Group');
        }
      });
    this.setState({isEdittogged: 2, name: '', id : '', price : '', desc: '', isactive : '' });
  }

  handleStudentClick(row){
    Service.studentAddgroup({ groupid: this.props.match.params.id, studentid : row.id }).then(response => {
      console.log(response);
      if(response.ack){
        this.getstudent();
      }
    });
  }

  handleCourseClick(row){
    Service.courseAddgroup({ groupid: this.props.match.params.id, courseid : row.id }).then(response => {
      console.log(response);
      if(response.ack){
        this.getcourse();
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

  handleEditClick(data){
    console.log(this.state);
    if(this.state.isEdittogged == true){
      Service.editGroup(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.getstudent();
          this.setState({isEdittogged: 2, name: '',desc: '', isactive : '', price : '', groupkey : '', id : ''  });
        }
      });

    }else{
      this.setState({isEdittogged: 1, id : data.id, name: data.name,desc: data.description, isactive : data.is_active, price : data.price, groupkey : data.group_key, });
    }
  }


  handleEdit(data){
    this.setState({isEdittogged: 0, name: '',desc: '', isactive : '', price : '', groupkey : '', id : '' });
  }

  handleDeleteClick(id){
    console.log(id);
    Service.deleteUser({userid : id}).then(response => {
      console.log(response);
      if(response.ack){
        this.getstudent();
      }
    });
  }


  render() {
    const styles = {  };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>

              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} > Users</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }} > Courses</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }} > Files </NavLink>
              </NavItem>

            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">

                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  {this.state.studentrows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td>
                    {this.state.studentrows[i].is_active == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleStudentClick(row)}><i className="fa fa-plus"></i></Button>&nbsp;
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>

              </TabPane>
              <TabPane tabId="2">

                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  {this.state.courserows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td>
                    {this.state.courserows[i].is_active == 1 ? (
                      <Badge color="success">Active</Badge>
                    ):(
                      <Badge color="danger">Inactive</Badge>
                    )}
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.handleCourseClick(row)}><i className="fa fa-plus"></i></Button>&nbsp;
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>

              </TabPane>
              <TabPane tabId="3">

                <div id="react-file-drop-demo" style={{border: '1px solid #a8a1a1',color: 'black', 'text-align': 'center', 'background': '#ddd', 'border-radius': "5px",
                                                      'height': '200px', 'line-height': '200px' }}>
                  <FileDrop onDrop={this.handleDrop}>
                    Drop some files here!
                  </FileDrop>
                </div>

                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>File</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Visible</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  {this.state.filerows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.file_name}</td>
                    <td>{row.file_type}</td>
                    <td>{row.file_size}</td>
                    <td>
                    {this.state.filerows[i].is_active == 1 ? (
                      <Badge color="success">Hidden</Badge>
                    ):(
                      <Badge color="danger">Shown</Badge>
                    )}
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        
      </div>
    );

  }
}

export default Groupinfo;
