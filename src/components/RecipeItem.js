import React, { Component } from 'react';
import reactStringReplace from 'react-string-replace';

class RecipeItem extends Component{
  render() {
    const { recipe } = this.props;
    if(typeof recipe === 'undefined') {
      return null;
    }
    const term = (this.props.searchString !== ''?this.props.searchString:null);
    const title = reactStringReplace(recipe.title, term, (match, i) => (
      <mark key={i}>{term}</mark>
    ));
    const ingredients = reactStringReplace(recipe.ingredients, term, (match, i) => (
      <mark key={i}>{match}</mark>
    ));
    return (
      <div className="col-sm-3 mt-4">
        <div className="card" onClick={()=> window.open(recipe.href, "_blank")}>
          <img className="card-img-top img-fluid" src={recipe.thumbnail} alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <strong>Ingredients: </strong>{ingredients}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeItem;