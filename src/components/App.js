import React, { Component } from 'react';
import Navbar from './Navbar';
import RecipeItem from './RecipeItem';
import api from '../services/api';
import InfiniteScroll from 'react-infinite-scroller';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      pokemons: [],
      hasMore: true
    };
    this.loadPokemons = this.loadPokemons.bind(this);
  }
  searchStringHandler = (e) => {
    this.setState({ searchString: e.target.value });
  }
  async loadPokemons() {
    console.log('load');
    let pokemons = [];
    await api.get('pokemon/')
    .then(function (res) {
      // handle success
      if(res.request.status === 200) {
        //console.log(res.data);
        pokemons = res.data.results;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
    this.setState({ pokemons, hasMore: false });
  }
  render() { 
    return (
      <div className="App">
        <Navbar input={this.state.searchString} inputHandler={this.searchStringHandler}/>
        <div className="container mt-10">
          <div className="row">
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadPokemons}
              hasMore={this.state.hasMore}
              loader={<div className="loader" key={0}>Loading ...</div>}
              useWindow={false}
            >
              {this.state.pokemons.filter(poke => poke.name.includes(this.state.searchString.toLowerCase())).map((poke, index) => (
                <RecipeItem poke={poke} key={index} searchString={this.state.searchString}/>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
/**/