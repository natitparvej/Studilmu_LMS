import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem,} from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../eventsService.js';

class History extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,schoolid : lognUser.schoolid , isLoggedIn: true, courserow: [], visible: false, info: false,};

    this.handleChange = this.handleChange.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleLecture = this.toggleLecture.bind(this);
    this.toggle = this.toggle.bind(this);
    this.courses = this.courses.bind(this);
    this.courses();

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  courses(){
    Service.getNotificationhistory({ admin_id: this.state.lognUser.id }).then(response => {
      console.log(response);
        if(response.ack == 1){
          console.log(response.history);
          this.setState({ courserow : response.history});
        }
    });
  }


  showalert(msgtxt) {
    setTimeout(function() { 
      this.setState({ visible: false, msg : '' });
    }.bind(this), 3000);
    this.setState({ visible: true, msg : msgtxt });
  }

  toggleSuccess(info) {
    console.log(info);
    this.setState({ reciver_email : info.reciver_email, body : info.body, date : info.date, subject : info.subject });
    this.setState({ success: !this.state.success,});
  }

  toggleLecture() {
    this.setState({ modalLecture: !this.state.modalLecture,});
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }

  render() {   
   
    return (
      <div className="animated fadeIn">
          <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>History</strong>
                <div className="card-header-actions">
                  
                </div>
              </CardHeader>
              <CardBody>

              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Subject</th>
                    <th>Date</th>                  
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.courserow.map((row, i) =>
                  <tr key={i}>
                    <td>{row.reciver_email}</td>
                    <td>{row.subject}</td>
                    <td>{row.date}</td>
                   
                    <td>
                      <Button color="primary" size="sm" onClick={() => this.toggleSuccess(row)}><i className="fa fa-eye"></i></Button>
                      <Button color="danger" size="sm" onClick={() => this.handleDeleteClick(row.id)}><i className="fa fa-mail-forward"></i></Button>
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
                
                </CardBody>
              
            </Card>
          </Col>
           
           <Modal isOpen={this.state.success} toggle={this.toggleSuccess} className={'modal-success ' + this.props.className}>
                  
                  <ModalHeader toggle={this.toggleSuccess}>Notification View</ModalHeader>
                  <form onSubmit={this.handleSubmit}>
                    <ModalBody>
                      <h5>{ this.state.subject }</h5>
                      <p>{this.state.date}</p>
                      <p className="text-muted">{this.state.body}</p>
                    </ModalBody>
                  </form>

                </Modal>


        </Row>
        </div>
      ); 


  }
}

export default History;
