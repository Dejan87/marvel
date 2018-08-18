import React, { Component } from 'react';

import classes from "./Search.css";
import axios from "../../axiosConfig";
import Character from "../../components/Character/Character";

class Search extends Component {
  state = {
    marvelCharacter: [],
    search: ""
  }

  fetchCharacters = (searchString) => {
    if(searchString !== "") {
        axios.get("/&nameStartsWith=" + searchString)
          .then(response => {
            console.log(response.data.data.results);
            this.setState({...this.state, marvelCharacter: response.data.data.results});
          })
          .catch(error => {
            console.log(error);
          })
    }
  }

  handleSearch = (event) => {
    // Get the user value
    const searchString = event.target.value;

    this.setState({...this.state, search: searchString});

    // Fetch characters
    this.fetchCharacters(searchString);    
  }

  render() {
    return (
        <section>
            <div className={classes.Search}>
                <input type="text" placeholder="Search Characters..." onChange={this.handleSearch} value={this.state.search} />
            </div>
            <div className={classes.Results + " row"}>
                {this.state.marvelCharacter.length > 0 ? this.state.marvelCharacter.map(character => {
                    return <Character
                                key={character.id}
                                name={character.name}
                                path={character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension} />
                }) : null}
            </div>
        </section>
    );
  }
}

export default Search;
