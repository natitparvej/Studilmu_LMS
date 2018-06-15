import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import { CardFooter, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Table, ListGroup, ListGroupItem, } from 'reactstrap';
import { Button, Card, CardHeader, Form, FormGroup, FormText, Label, CardBody, CardGroup, Col } from 'reactstrap';

import classnames from 'classnames';
import authService from '../../Service/authService.js';
import Service from './../settingService.js';

class Subpackage extends Component {
  constructor(props) {
    super(props);
    var lognUser =  authService.getUser();
    this.state = {lognUser: lognUser , authors : [], activeTab: '1', site_title: '', site_key: '', site_description : '', logo: '', visible: false, favicon : '', stripe_key: '', stripe_password : '', paypal_id : '' , facebook : '', twitter : '', instagram : '', smtp_host:'', smtp_user:'', smtp_password:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggle = this.toggle.bind(this);    
    this.getSetting();
  }

  getSetting(){
     Service.getSetting().then(response => {
         //console.log(response);
         if(response.ack == 1){
           console.log(response.result.site_title);
           this.setState({ site_title: response.result.site_title, site_key: response.result.site_key, site_description : response.result.site_description, logo: response.result.logo, favicon : response.result.favicon, stripe_key: response.result.stripe_key, stripe_password : response.result.stripe_password, paypal_id : response.result.paypal_id , facebook : response.result.facebook, twitter : response.result.twitter, instagram : response.result.instagram, smtp_host:response.result.smtp_host, smtp_user:response.result.smtp_user, smtp_password:response.result.smtp_password});
         }
     });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state);
    if(!this.state.site_title){     
      this.showalert('Enter site title.'); return 1;
    }
    if(!this.state.site_key){
      this.showalert('Enter site key.'); return 1;
    }
    
    
      Service.editSetting(this.state).then(response => {
        console.log(response);
        if(response.ack = 1){
          //this.setState({ site_title: '', site_key: '', site_description : '', logo: '', visible: false, favicon : '', stripe_key: '', stripe_password : '', paypal_id : '' , facebook : '', twitter : '', instagram : '', smtp_host:'', smtp_user:'', smtp_password:''});
          this.showalert('Setting Update Successfully.');
          this.getSetting();
        }else{
          this.showalert('Setting not updated.');
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
                <strong>Site Settings</strong>
              </CardHeader>
              <CardBody>

                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
                <Alert color="danger" isOpen={this.state.visible}>{this.state.msg}</Alert>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="site_title" value={this.state.site_title} onChange={this.handleChange} id="text-input" placeholder="Enter site name." />                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Key</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" rows="2" name="site_key" value={this.state.site_key} onChange={this.handleChange} id="text-input" placeholder="Enter Site key." />                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" rows="3" name="site_description" value={this.state.site_description} onChange={this.handleChange} id="text-input" placeholder="Enter Site description." />                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Logo</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" name="logo" value={this.state.logo} onChange={this.handleChange} id="text-input"/>                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Site Favicon</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" name="favicon" value={this.state.favicon} onChange={this.handleChange} id="text-input" />                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Stripe key</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="stripe_key" value={this.state.stripe_key} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Stripe Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="stripe_password" value={this.state.stripe_password} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Paypal ID:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="paypal_id" value={this.state.paypal_id} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Facebook:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="facebook" value={this.state.facebook} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Twitter:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="twitter" value={this.state.twitter} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Instagram:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="instagram" value={this.state.instagram} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Smtp Host:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="smtp_host" value={this.state.smtp_host} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Smtp User:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="smtp_user" value={this.state.smtp_user} onChange={this.handleChange} id="text-input" />
                    </Col>                   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Smtp Password:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="smtp_password" value={this.state.smtp_password} onChange={this.handleChange} id="text-input" />
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

export default Subpackage;
