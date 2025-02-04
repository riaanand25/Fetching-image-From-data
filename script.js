import { PokemonData } from "./data.js";

const PokemonContainer = document.querySelector(".container");
const SelectBox = document.querySelector("#SelectBox");
const allPokemonDetails = []
async function FetchingPokemon(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allPokemonDetails.push(data)
    return {
      image: data.sprites.other.dream_world.front_default,
      types: data.types.map(typeinfo => typeinfo.type.name),
    };
  } catch (error) {
    console.log(error);
  }
}

async function fetchingTypes() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type/?limit=21");
    const data = await response.json();

    data.results.forEach((type) => {
      const option = document.createElement("option");
      option.value = type.name;
      option.innerText = type.name;
      // console.log(option)
      SelectBox.appendChild(option);
    });
  } catch (error) {
    // console.log(error);
  }
}
fetchingTypes();
let allPokemon = [];

async function PokemonDisplay() {
  for (const user of PokemonData) {
    const { image, types } = await FetchingPokemon(user.url);

    const div = document.createElement("div");
    div.classList.add("ContainPokemonData");

    const img = document.createElement("img");
    img.classList.add("PokemonImage");
    img.src = image;

    const h1 = document.createElement("h1");
    h1.classList.add("PokemonName");
    h1.innerText = user.name;

    const typeText = document.createElement("p");
    typeText.classList.add("PokemonType");
    typeText.innerText = `${types.join(", ")}`;

    div.append(img, h1, typeText);
    PokemonContainer.append(div);

    allPokemon.push(div);
  }
}
PokemonDisplay();

SelectBox.addEventListener("change", PokemonDisplaybyType)
function PokemonDisplaybyType(e) {
  console.log(e.target.value)
  const typeToFind = e.target.value;
  // console.log(typeToFind);

  const copy = allPokemonDetails
  copy.filter((pokemon) => {
    return pokemon.types[0].type.name === typeToFind;

    
    

  });
}





