import React from 'react';
import './App.css';
import Form from "./components/form/form";
import ReviewsListContainer from "./components/reviews/reviewsListContainer";

//<Search />
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
        <ReviewsListContainer />
      </header>
    </div>
  );
}

export default App;
