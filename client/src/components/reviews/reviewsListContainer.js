import React from "react";
import Reviews from "./reviews";
import Search from "../search/search";

class ReviewsListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            search: ''
        }
     }

    handleSearchChange = (childData) => {
        console.log(childData);
        this.setState({search: childData})
    }

    componentDidMount() {
        fetch("/reviews")
            .then(res => res.json())
            .then(reviews => this.setState({reviews}))
    }

    filterReviewsBySearch(reviews, filterBy) {
        if (filterBy === '')
            return reviews;
        else
            return reviews.filter( (rev) => {return rev.email.startsWith(filterBy, 0);} );
    }

    filterReviewsByCount(reviews, count)
    {
        return reviews.slice(0, count);
    }

    filterByAllFilters(reviews)
    {
        const count = 5;
        return this.filterReviewsByCount(this.filterReviewsBySearch(this.state.reviews, this.state.search), count);
    }

    render() {
        return (
            <div>
                <Search search = {this.state.search} handleSearchChange = {this.handleSearchChange}/>
                <Reviews reviews={this.filterByAllFilters(this.state.reviews)}/>
            </div>
        )
    }
}
export default ReviewsListContainer;