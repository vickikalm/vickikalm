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

    getUserInfo(userEmail) {

        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: userEmail})
        };

        fetch('/user-last-seen', body)
            .then(response => response.json())
            .then(data => alert(data))


        //.then(data => this.setState( {popupContent: data}));


        // fetch("/user-last-seen",
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(userEmail),
        //         headers: {
        //             //'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //             },
        //         }).then((res) => {res.json().then(data => this.setState({popupContent: data}))})
        //           .catch( (error) => {
        //                 console.log('Request failed', error);
        //             });
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
                <Reviews reviews={this.filterByAllFilters(this.state.reviews)} getUserInfo = {this.getUserInfo}/>
            </div>
        )
    }
}
export default ReviewsListContainer;