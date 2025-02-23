// Elements
const userInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const imgContainer = document.getElementById('img-container');
const pokeName = document.getElementById('pokemon-name');
const pokeID = document.getElementById('pokemon-id');
const pokeHeight = document.getElementById('height');
const pokeWeight = document.getElementById('weight');
const pokeTypes = document.getElementById('types');
const pokeHP = document.getElementById('hp');
const pokeAttack = document.getElementById('attack');
const pokeDefense = document.getElementById('defense');
const pokeSpecialAtk = document.getElementById('special-attack');
const pokeSpecialDef = document.getElementById('special-defense');
const pokeSpeed = document.getElementById('speed');


// URL's
const allPokemonInfo = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

// Used personally to determine which properties I needed to grab by viewing objects in the console
const fetchAllPokemon = async () => {
    const response = await fetch(allPokemonInfo);
    const data = await response.json();
    console.log(data);
};

fetchAllPokemon();

// API fetch
const fetchData = () => {
    // User input variable converted to lowercase to match api names
    const searchValue = userInput.value.toLowerCase();
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchValue}`;
    
    // Gets the api, extracts and converts the data to usable objects
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const pokemon = data;
        pokeTypes.textContent = "";

        // Checks whether the search value is a name or ID, if ID the string input is converted into a number
        if (searchValue === pokemon.name || Number(searchValue) === pokemon.id) {
            // Destructures internal objects for cleaner code
            const { sprites, stats, types } = pokemon;

            // Sets up text content for name, ID, height, and weight elements
            pokeName.textContent = pokemon.name.toUpperCase();
            pokeID.textContent = `#${pokemon.id}`;
            pokeHeight.textContent = `Height: ${pokemon.height}`;
            pokeWeight.textContent = `Weight: ${pokemon.weight}`;
            
            // Sets type spans for pokemon
            types.forEach((type) => {
                const typeSpan = document.createElement('span');
                typeSpan.textContent = type.type.name;
                typeSpan.classList.add(`type-${type.type.name}`);
                pokeTypes.appendChild(typeSpan);
            });

            // Gets all base stats from API and sets text content of stats elements
            pokeHP.textContent = stats[0].base_stat;
            pokeAttack.textContent = stats[1].base_stat;
            pokeDefense.textContent = stats[2].base_stat;
            pokeSpecialAtk.textContent = stats[3].base_stat;
            pokeSpecialDef.textContent = stats[4].base_stat;
            pokeSpeed.textContent = stats[5].base_stat;

            console.log(sprites);

            // Adds associated images to the image container
            imgContainer.innerHTML = `
            <img id="sprite" src="${sprites.front_default}" alt="Image of ${pokemon.name.toUpperCase()}"/>
            `
            console.log(sprites.front_default);
        }
    }).catch((err) => {
        alert("Pokemon not found");
    })
};

// Adds a listener to the button for mouse events
searchBtn.addEventListener('click', fetchData);
// Adds a listener to the window for keyboard events
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchData();
    }
})


