const pokemonId = document.querySelector('.pokemon_id');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonSprite = document.querySelector('.pokemon_sprite');
const pokemonIcon = document.querySelector('.pokemon_icon');
const pokedexErro = document.querySelector('.pokedex_erro');
const pokedexLoading = document.querySelector('.pokedex_loading');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnProximo = document.querySelector('.btn_proximo');
const btnAnterior = document.querySelector('.btn_anterior');
const preloader = document.querySelector('.pg_loading')

window.addEventListener('load', function () {
    preloader.classList.add('hide-pg_loading');
})

let searchPokemon = Math.floor(Math.random() * 1010) + 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokedexLoading.style.display = 'block'
    const data = await fetchPokemon(pokemon);
    pokedexLoading.style.display = 'none'
    if (data) {
        pokedexErro.style.display = 'none'
        pokemonName.innerHTML = data.name.toUpperCase();
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
        pokemonIcon.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
        if (data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] === null) {
            pokemonSprite.src = data['sprites']['other']['official-artwork']['front_default'];
        } else {
            pokemonSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        searchPokemon = data.id;
    } else {
        pokedexErro.style.display = 'block'
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnProximo.addEventListener('click', () => {
    if (searchPokemon < 1010) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    } else {
        searchPokemon = 1;
        renderPokemon(searchPokemon);
    }
});

btnAnterior.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } else {
        searchPokemon = 1010;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);