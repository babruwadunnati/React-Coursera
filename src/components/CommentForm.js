import React, { Component } from 'react'
import {Modal, ModalBody , ModalHeader,  Label, Button, Col,Row }from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export default class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={
            isCommentModalOpen:false
            
        }
        this.toggleComment = this.toggleComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleComment(){
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        })

    }
    handleSubmit(values){
        this.toggleComment();
        // console.log("Current State is" + JSON.stringify(values));
        // alert("Current State is" + JSON.stringify(values));
        this.props.addComment(this.props.dishId,values.rating,values.author, values.comment);
        
    }
    render() {
        return (
            <div>
            <Button outline onClick={this.toggleComment}>
                <span className="fa fa-pencil fa-fw"></span> 
                Submit Comment
            </Button>
            <div className="row row-content">
            <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleComment}>
            <ModalHeader toggle={this.toggleModal}> Submit comment</ModalHeader>
                        <ModalBody>
                            <div >
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Col md={12}>
                                            <Control.select model=".rating" name="rating" className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="name" >Your name</Label>
                                        <Col md={12}>
                                            <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".name" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="feedback" >Your feedback</Label>
                                        <Col md={12}>
                                            <Control.textarea model=".feedback" id="feedback" name="feedback" rows="4" className="form-control" validators={{ required }} />
                                            <Errors className="text-danger" model=".feedback" show="touched" messages={{ required: 'Required'}} />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    
            </Modal>
            </div>

            </div>

            
            
        )
    }
}
