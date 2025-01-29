import { PokemonData } from "./data.js";
console.log(PokemonData);

const PokemonContainer = document.querySelector(".container");
const SelectBox = document.querySelector("#SelectBox");

async function FetchingPokemon(url) {
try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.sprites.other.dream_world.front_default;
} 
catch (error) {
    console.log(error)
}
}

async function PokemonDisplay() {
  for (const user of PokemonData) {
    const div = document.createElement("div");
    div.classList.add("ContainPokemonData");

    const img = document.createElement("img");
    img.classList.add("PokemonImage");
    img.src = await FetchingPokemon(user.url);

    const h1 = document.createElement("h1");
    h1.classList.add("PokemonName");
    h1.innerHTML = user.name;

    const option = document.createElement("option");
    option.classList.add("NameOption");
   

    SelectBox.append(option);
    div.append(img, h1);
    PokemonContainer.append(div);
  }
}

PokemonDisplay();
