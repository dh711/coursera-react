import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Label,
    Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormOpen: false,
        };

        // Binding functions.
        this.toggleForm = this.toggleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(props);
    }

    toggleForm() {
        this.setState({
            isFormOpen: !this.state.isFormOpen,
        });
    }

    handleSubmit(values) {
        this.toggleForm();
        this.props.postComment(
            this.props.dishId,
            values.rating,
            values.name,
            values.comment
        );
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleForm}>
                    <span className="fa fa-pencil"></span> Submit Comments
                </Button>

                <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit a comment...
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm
                            onSubmit={(values) => this.handleSubmit(values)}
                        >
                            <Row className="form-group">
                                <Label htmlFor="firstname">Rating</Label>
                                <Col>
                                    <Control.select
                                        model=".rating"
                                        className="form-control mt-2"
                                        id="name"
                                        name="rating"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group mt-4">
                                <Label htmlFor="name">Your Name</Label>
                                <Col md={12}>
                                    <Control.text
                                        model=".name"
                                        className="form-control mt-2"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger mt-2"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength:
                                                "Must be greater than 2 characters. ",
                                            maxLength:
                                                "Must be 15 characters or less.",
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group mt-4">
                                <Label htmlFor="comment">Your Comment</Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model=".comment"
                                        className="form-control mt-2"
                                        id="comment"
                                        name="comment"
                                        rows="12"
                                    />
                                </Col>
                            </Row>
                            <Row
                                className="form-group"
                                style={{ marginTop: "50px" }}
                            >
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit.
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div key={dish.id} className="col-12 col-md-6 mb-4">
                <Card>
                    <CardImg
                        width="100%"
                        src={baseUrl + dish.image}
                        alt={dish.name}
                    />
                    <CardBody>
                        <CardTitle>
                            <strong>{dish.name}</strong>
                        </CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return <div></div>;
    }
}

function RenderComments(props) {
    // console.log(comment);
    // console.log(dishId);
    // console.log(addComment);
    console.log(props);
    if (props.comment != null) {
        const dishComments = props.comment.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>"{comment.comment}"</p>
                    <p>
                        -- {comment.author} on{" "}
                        {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            );
        });

        return (
            <div className="col-12 col-md-6 mb-4">
                <h4>Comments</h4>
                <ul className="list-unstyled">{dishComments}</ul>
                <CommentForm
                    dishId={props.dishId}
                    postComment={props.postComment}
                />
            </div>
        );
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
    // console.log(props);
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments
                        comment={props.comment}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    }

    return <div></div>;
};

export default DishDetail;
