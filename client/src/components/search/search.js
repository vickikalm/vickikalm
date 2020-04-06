import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div>
                <input type="text" placeholder="Search" onChange={(event) => {this.props.handleSearchChange(event.target.value)}}/>
            </div>
        )
    }
}

export default Search;
