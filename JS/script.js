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
const pokemonType = document.querySelector('.pokemon_type')


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
    pokemonType.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    pokedexLoading.style.display = 'none'

    if (data) {

        data.types.forEach((types) => {
            let type = types.type.name;
            switch (type) {
                case 'normal':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/3/39/NormalIC_Big.png\">";
                    break;
                case 'fighting':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/6/67/FightingIC_Big.png\">";
                    break;
                case 'flying':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/c/cb/FlyingIC_Big.png\">";
                    break;
                case 'poison':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/3/3d/PoisonIC_Big.png\">";
                    break;
                case 'ground':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/8/8f/GroundIC_Big.png\">";
                    break;
                case 'rock':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/c/ce/RockIC_Big.png\">";
                    break;
                case 'bug':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/c/c8/BugIC_Big.png\">";
                    break;
                case 'ghost':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/7/73/GhostIC_Big.png\">";
                    break;
                case 'steel':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/d/d4/SteelIC_Big.png\">";
                    break;
                case 'fire':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/2/26/FireIC_Big.png\">";
                    break;
                case 'water':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/5/56/WaterIC_Big.png\">";
                    break;
                case 'grass':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/7/74/GrassIC_Big.png\">";
                    break;
                case 'electric':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/4/4a/ElectricIC_Big.png\">";
                case 'psychic':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/6/60/PsychicIC_Big.png\">";
                case 'ice':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/6/6f/IceIC_Big.png\">";
                case 'dragon':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/4/48/DragonIC_Big.png\">";
                case 'dark':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/5/56/DarkIC_Big.png\">";
                case 'fairy':
                    pokemonType.innerHTML += "<img src=\"https://archives.bulbagarden.net/media/upload/b/ba/FairyIC_XY.png\" height=\"17px\" >";
            }
        });

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