import React, { Component } from 'react';

import classes from "./Search.css";
import axios from "../../axiosConfig";
import Character from "../../components/Character/Character";
import NavigationButtons from "../../components/NavigationButtons/NavigationButtons";

class Search extends Component {
    state = {
        marvelCharacter: [],
        search: "",
        currentPageItems: [],
        previousPageItems: [],
        pageSize: 20, // Display 20 per page
        currentPage: 0,
        previousButtonDisabled: true,
        nextButtonDisabled: false
    }

    // Fetch all characters from Marvel API, limit 50
    fetchCharacters = (searchString) => {
        if(searchString !== "") {
            axios.get("/&nameStartsWith=" + searchString)
                .then(response => {
                console.log(response.data.data.results);
                this.setState({...this.state, marvelCharacter: response.data.data.results});

                this.renderCharacters(); // Render characters to the screen
            })
            .catch(error => {
                console.log(error);
             })
        } else {
            // If user searches for another character, set pagination logic and search result to default (empty arrays)
            this.setState({...this.state, 
                search: searchString, 
                marvelCharacter: [], 
                currentPageItems: []
            });
        }
    }

    handleSearch = (event) => {
        // Get the user value
        const searchString = event.target.value;

        this.setState({...this.state, 
            search: searchString,
            currentPageItems: [],
            previousPageItems: [],
            currentPage: 0,
            previousButtonDisabled: true,
            nextButtonDisabled: false
        });

        // Fetch characters
        this.fetchCharacters(searchString);    
    }

    renderCharacters = () => {
        let marvelCharacters = [...this.state.marvelCharacter];
        if (marvelCharacters.length > this.state.pageSize) {
            let slice = marvelCharacters.slice(0, this.state.pageSize);
            this.setState({...this.state, currentPageItems: slice, nextButtonDisabled: false});
        } else {
            let arr = marvelCharacters;
            this.setState({...this.state, currentPageItems: arr});
        }
    }

    navigateToNextPage = () => {
        // Store all slices of state into variables
        let marvelCharacters = this.state.marvelCharacter;
        let currentPage = this.state.currentPage;
        let pageSize = this.state.pageSize;
        let currentPageItems = this.state.currentPageItems;
        let previousPageItems = this.state.previousPageItems;
        let nextButtonDisabled = this.state.nextButtonDisabled;

        let numberOfElementsToPlaceInNextPage = ((marvelCharacters.length > currentPage * pageSize + pageSize) ? pageSize : marvelCharacters.length - currentPage * pageSize)
    
        if (currentPageItems.length > 0) {
            previousPageItems = currentPageItems;
        }

        currentPage++;

        currentPageItems = marvelCharacters.slice(currentPage * pageSize, currentPage*pageSize+numberOfElementsToPlaceInNextPage);
    
        // Disable next button if there are no characters left
        if (marvelCharacters.indexOf(currentPageItems[currentPageItems.length-1]) === marvelCharacters.length-1) {
            nextButtonDisabled = true;      
        }

        this.setState({...this.state, 
            currentPageItems: currentPageItems,
            previousPageItems: previousPageItems,
            currentPage: currentPage, 
            previousButtonDisabled: false,
            nextButtonDisabled: nextButtonDisabled
        });
    }

    navigateToPreviousPage = () => {
        let marvelCharacters = this.state.marvelCharacter;
        let currentPage = this.state.currentPage;
        let pageSize = this.state.pageSize;
        let currentPageItems = this.state.currentPageItems;
        let previousPageItems = this.state.previousPageItems;
        let previousButtonDisabled = this.state.previousButtonDisabled;

        currentPageItems = previousPageItems;

        currentPage--;

        // If user is on the first page then disable previous button and empty previousPageItems array
        if (currentPage === 0) {        
            previousButtonDisabled = true;
            previousPageItems = [];
        } else {
            previousPageItems = marvelCharacters.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
        }

        this.setState({...this.state,
            currentPageItems: currentPageItems,
            previousButtonDisabled: previousButtonDisabled,
            nextButtonDisabled: false,
            previousPageItems: previousPageItems,
            currentPage: currentPage
        });
    }

    render() {

        let characters = this.state.currentPageItems.length > 0 ? this.state.currentPageItems.map(character => {
            return <Character
                    key={character.id}
                    name={character.name}
                    path={character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension}
                    status="Please, bookmark me!" />
            }) : null;

        // Check if we need buttons for pagination
        let navigation = this.state.marvelCharacter.length > this.state.pageSize 
            ? <NavigationButtons 
                currentPage={this.state.currentPage + 1}
                nextDisabled={this.state.nextButtonDisabled}
                prevDisabled={this.state.previousButtonDisabled}
                nextClick={this.navigateToNextPage}
                prevClick={this.navigateToPreviousPage} /> 
            : null;

        return (
            <section>
                <div className={classes.Search}>
                    <input type="text" placeholder="Search Characters..." onChange={this.handleSearch} value={this.state.search} />
                </div>
                <div className={classes.Results + " row"}>
                    {characters}
                </div>
                {navigation}
            </section>
        );
    }
}

export default Search;
