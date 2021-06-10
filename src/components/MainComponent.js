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

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={
                        this.props.promotions.filter(
                            (promotion) => promotion.featured
                        )[0]
                    }
                    leader={
                        this.props.leaders.filter(
                            (leader) => leader.featured
                        )[0]
                    }
                />
            );
        };

        const DishWithID = ({ match }) => {
            return (
                <DishDetail
                    dish={
                        this.props.dishes.filter(
                            (dish) =>
                                dish.id === parseInt(match.params.dishId, 10)
                        )[0]
                    }
                    comment={this.props.comments.filter(
                        (comment) =>
                            comment.dishId === parseInt(match.params.dishId, 10)
                    )}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route
                        path="/aboutus"
                        component={() => <About leaders={this.props.leaders} />}
                    />
                    <Route
                        exact
                        path="/menu"
                        component={() => <Menu dishes={this.props.dishes} />}
                    />
                    <Route path="/menu/:dishId" component={DishWithID} />
                    <Route exact path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
