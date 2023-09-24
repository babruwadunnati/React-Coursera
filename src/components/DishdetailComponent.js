import {Card,CardImg,CardText,CardBody,CardTitle,BreadcrumbItem,Breadcrumb,Modal, ModalBody , ModalHeader,  Label, Button, Col,Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import React, { Component } from 'react'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component {
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
        console.log("Current State is" + JSON.stringify(values));
        alert("Current State is" + JSON.stringify(values));
        this.props.postComment(this.props.dishId,values.rating,values.name, values.feedback);
        
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
                                            <Control.select model=".rating"  id="rating" name="rating" className="form-control" validators={{required}}>
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
     
function RenderDish({dish}) {
    if (dish != null)
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    else
        return(
            <div></div>
        );
}
function RenderComments({comments,postComment,dishId}){
    console.log(comments);
    if (comments != null)
        return(
            <div className="container">
                <h4>Comments</h4>
                <ul className = "list-unstyled">
                    <Stagger in>
                        {comments.map((comment) =>{
                            return(
                                <Fade in>
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p> -- {comment.author} , {new Intl.DateTimeFormat('en-US',{year: 'numeric',month: 'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                </Fade>
                            );
                        }
                        )}
                    </Stagger>
                    
                </ul>
                <div>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
                
               
                
            </div>
        );
        
    else
        return(
            <div></div>
        );
}
const DishDetail = (props) =>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish!=null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to ="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                    
                        <div  className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
                        </div>
    
                </div>
                
            </div>
        )
}


export default DishDetail;