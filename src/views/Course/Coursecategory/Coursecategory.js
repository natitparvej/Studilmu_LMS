import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem, } from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../courseService.js';
//test Santanu
class Coursecategory extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser ,user_id : lognUser.schoolid, name: '', visible: false, msg : '', ownerrows : [], rows: []};
    this.handleChange = this.handleChange.bind(this);
    this.handlebioSubmit = this.handlebioSubmit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggle = this.toggle.bind(this);
    this.category = this.category.bind(this);
    this.handleownerChange = this.handleownerChange.bind(this);
    this.category();

    Service.getOwners().then(response => {
      console.log(response);
      if(response.students){
        this.setState({ ownerrows: response.students });        
      }
    },err =>{
      console.log(err);
    });
  
  }

  
  
  category(){
    Service.getCategory().then(response => {
        console.log(response);
        if(response.ack){
          this.setState({ rows : response.category, name: ''});
        }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlebioSubmit(event) {
    //console.log(event);
    event.preventDefault();
    if(!this.state.name){
      this.showalert('Enter Category Name'); return ;
    }
    console.log(this.state);
      Service.addCategory(this.state).then(response => {
        console.log('responce:'+response);
        if(response.ack){
          this.toggleSuccess();
          this.category();
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
      Service.editCategory(this.state).then(response => {
        console.log(response);
        if(response.ack){
          this.category();
          this.setState({isEdittogged: false, name: '', id : '' });
        }
      });
    }else{
      this.setState({isEdittogged: true, name: data.name, id : data.id });
    }
  }

  handleEdit(data){
    console.log(data);
  }

  render() {

    const categorydiv = this.state.isEdittogged ? (
      <Card>
        <CardHeader>
          <strong>Edit Category</strong>
        </CardHeader>
        <CardBody>

          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Category Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="categoryname" value={this.state.name} onChange={this.handleChange} id="text-input" placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'" />
                <FormText color="muted">This is a help text</FormText>
              </Col>
            </FormGroup>
            

          </Form>

        </CardBody>
        <CardFooter>
          <Button type="submit" size="sm" color="primary" onClick={this.handleEditClick}><i className="fa fa-dot-circle-o"></i> Update</Button>
        </CardFooter>
      </Card>
    ) : (
      <Row>
        <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Category</strong>
                <div className="card-header-actions">
                    <button aria-pressed="true" className="btn btn-success btn-block active" onClick={this.toggleSuccess}>Add Category</button>
                </div>
              </CardHeader>
              <CardBody>

              <Table responsive striped>
                  <thead>
                  <tr>
                    <th>#</th>    
                    <th>Name</th>                   
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  {this.state.rows.map((row, i) =>
                  <tr key={i}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>                    
                      <td>
                        <Button color="primary" size="sm" onClick={() => this.handleEditClick(row)}><i className="fa fa-pencil"></i></Button>
                        <Button color="danger" size="sm"><i className="fa fa-trash-o"></i></Button>
                      </td>
                    
                  </tr>

                  )}

                  </tbody>
                </Table>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  
                  <ModalHeader toggle={this.toggleSuccess}>Add Category</ModalHeader>
                  <form onSubmit={this.handlebioSubmit}>
                      <ModalBody>

                          <Alert color="danger" isOpen={this.state.visible}>{this.state.msg}</Alert>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" name="user_id" onChange={this.handleChange} value={this.state.parentid}>
                              <option value='' >Select Owner</option>
                              {this.state.ownerrows.map((row, i) =>
                              <option value={row.id} key={i}>{row.name}</option>
                              )}
                            </Input>
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Category Name" name="name" value={this.state.name} onChange={this.handleChange}/>
                          </InputGroup>
                          
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-graph"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number" placeholder="Price" name="price" value={this.state.price} onChange={this.handleChange}/>
                          </InputGroup>
                      
                      </ModalBody>
                      <ModalFooter>
                        <Button color="success" type="submit">Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleSuccess}>Cancel</Button>
                      </ModalFooter>
                  </form>

                </Modal>
                </CardBody>
              
            </Card>
          </Col>
          
        </Row>
    );
    return (
      <div className="animated fadeIn">
      {categorydiv}
      </div>
    );
  }
}

export default Coursecategory;
