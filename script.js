import { PokemonData } from "./data.js";
console.log(PokemonData);

const PokemonContainer = document.querySelector(".container");
const SelectBox = document.querySelector("#SelectBox");

async function FetchingPokemon(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return {
      image: data.sprites.other.dream_world.front_default,
      types: data.types.map(typeinfo => typeinfo.type.name) 
    };
    
  } catch (error) {
    console.log(error);

  }
}

async function PokemonDisplay() {
  for (const user of PokemonData) {
    const div = document.createElement("div");
    div.classList.add("ContainPokemonData");

    const img = document.createElement("img");
    img.classList.add("PokemonImage");
    const {image,types}= await FetchingPokemon(user.url);
    img.src = image

    const h1 = document.createElement("h1");
    h1.classList.add("PokemonName");
    h1.innerHTML = user.name;


    const p = document.createElement("p");
    p.textContent =`${types.join(",")}`;


    types.forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.innerHTML = type;
      SelectBox.appendChild(option);
  });
   

    

    div.append(img, h1,p);
    PokemonContainer.append(div);
  }
}

PokemonDisplay();
