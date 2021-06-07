import { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg
                            width="100%"
                            src={dish.image}
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

    renderComments(comments) {
        if (comments != null) {
            const dishComments = comments.map((comment) => {
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
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">{dishComments}</ul>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    render() {
        const dish = this.props.dish;

        if (dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderDish(dish)}
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            );
        }

        return <div></div>;
    }
}

export default DishDetail;
