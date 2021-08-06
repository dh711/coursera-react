import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import {
    postComment,
    postFeedback,
    fetchDishes,
    fetchComments,
    fetchPromos,
    fetchLeaders,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        feedback
    ) =>
        dispatch(
            postFeedback(
                firstname,
                lastname,
                telnum,
                email,
                agree,
                contactType,
                feedback
            )
        ),
    fetchDishes: () => {
        dispatch(fetchDishes());
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset("feedback"));
    },
    fetchComments: () => {
        dispatch(fetchComments());
    },
    fetchPromos: () => {
        dispatch(fetchPromos());
    },
    fetchLeaders: () => {
        dispatch(fetchLeaders());
    },
});

class Main extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) => dish.featured
                        )[0]
                    }
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={
                        this.props.promotions.promotions.filter(
                            (promotion) => promotion.featured
                        )[0]
                    }
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={
                        this.props.leaders.leaders.filter(
                            (leader) => leader.featured
                        )[0]
                    }
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        };

        const DishWithID = ({ match }) => {
            return (
                <DishDetail
                    postComment={this.props.postComment}
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) =>
                                dish.id === parseInt(match.params.dishId, 10)
                        )[0]
                    }
                    isLoading={this.props.dishes.isLoading}
                    ErrMess={this.props.dishes.errMess}
                    comment={this.props.comments.comments.filter(
                        (comment) =>
                            comment.dishId === parseInt(match.params.dishId, 10)
                    )}
                    commentsErrMess={this.props.comments.errMess}
                />
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition
                        key={this.props.location.key}
                        classNames="page"
                        timeout={300}
                    >
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route
                                path="/aboutus"
                                component={() => (
                                    <About leaders={this.props.leaders} />
                                )}
                            />
                            <Route
                                exact
                                path="/menu"
                                component={() => (
                                    <Menu dishes={this.props.dishes} />
                                )}
                            />
                            <Route
                                path="/menu/:dishId"
                                component={DishWithID}
                            />
                            <Route
                                exact
                                path="/contactus"
                                component={() => (
                                    <Contact
                                        resetFeedbackForm={
                                            this.props.resetFeedbackForm
                                        }
                                        postFeedback={this.props.postFeedback}
                                    />
                                )}
                            />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
