import React, { Component } from 'react';
import reactStringReplace from 'react-string-replace';
import api from '../services/api';

class RecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: {}
    };
  }
  async componentWillMount() {
    const { poke } = this.props;
    let pokemon;
    if(typeof poke === 'undefined') {
      return null;
    }
    await api.get('pokemon/'+poke.name).then(function (res) {
      // handle success
      if(res.request.status === 200) {
        pokemon = res.data;
      }
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
    this.setState({ pokemon });
  }
  render() {    
    const term = (this.props.searchString !== ''?this.props.searchString:null);
    let sprite = '', name = '';

    if (typeof this.state.pokemon.name !== 'undefined') {
      name = reactStringReplace(this.state.pokemon.name, term, (match, i) => (
        <mark key={i}>{term}</mark>
      ));
    }

    if (typeof this.state.pokemon.sprites !== 'undefined')
      sprite = this.state.pokemon.sprites.front_default;

    return (
      <div className="col-sm-3 mt-4">
        <div className="card" >
          <img className="card-img-top img-fluid" src={sprite} alt="Front" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeItem;