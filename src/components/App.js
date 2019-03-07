import React, { Component } from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: ''
    };
  }
  searchStringHandler = (e) => {
    this.setState({ searchString: e.target.value });
  }
  render() { 
    return (
      <div className="App">
        <Navbar input={this.state.searchString} inputHandler={this.searchStringHandler}/>
        <div className="container mt-10">
          <div className="row">
            { this.recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(this.state.searchString.toLowerCase()) || 
            recipe.ingredients.toLowerCase().includes(this.state.searchString.toLowerCase())
            ).map((recipe, index) => (
              <RecipeItem recipe={recipe} key={index} searchString={this.state.searchString}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
