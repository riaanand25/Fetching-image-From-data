import { PokemonData } from "./data.js";

const PokemonContainer = document.querySelector(".container");
const SelectBox = document.querySelector("#SelectBox");
const allPokemonDetails = []
async function FetchingPokemon(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allPokemonDetails.push(data)
    // console.log(data);

    return {
      image: data.sprites.other.dream_world.front_default,
      types: data.types.map(typeinfo => typeinfo.type.name),
    };
  } catch (error) {
    // console.log(error);
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

async function PokemonDisplay(firstTime = false, data = PokemonData) {
  console.log("data", data);

  PokemonContainer.innerHTML = "";
  for (const user of data) {
    let temp;

    if (firstTime) {
      temp = await FetchingPokemon(user.url);
    }

    const div = document.createElement("div");
    div.classList.add("ContainPokemonData");

    const img = document.createElement("img");
    img.classList.add("PokemonImage");
    if (firstTime) img.src = temp.image;
    else img.src = user.sprites.other.dream_world.front_default

    const h1 = document.createElement("h1");
    h1.classList.add("PokemonName");
    h1.innerText = user.name;

    const typeText = document.createElement("p");
    typeText.classList.add("PokemonType");
    if (firstTime) typeText.innerText = `${temp.types.join(", ")}`;
    else {
      const types = user.types.map(typeinfo => typeinfo.type.name);
      typeText.innerText = `${types.join(", ")}`;
    }

    div.append(img, h1, typeText);
    PokemonContainer.append(div);

  }
}
PokemonDisplay(true);

SelectBox.addEventListener("change", PokemonDisplaybyType)
function PokemonDisplaybyType(e) {
  console.log(e.target.value)
  const typeToFind = e.target.value;
  // console.log(typeToFind);
  if (typeToFind === "All types") {
    PokemonDisplay(false, allPokemonDetails)
  }
  else {
    const copy = allPokemonDetails;
    const filteredPokemons = copy.filter((pokemon) => {
      return pokemon.types[0].type.name === typeToFind;
    })
    PokemonDisplay(false, filteredPokemons)
  }
}


//   PokemonContainer.innerHTML="";
//   filteredPokemons.forEach((pokemon)=>{
//     const div = document.createElement("div");
//     div.classList.add("ContainPokemonData");


//     const img = document.createElement("img");
//     img.classList.add("PokemonImage");
//     img.src = pokemon.sprites.other.dream_world.front_default;

//     const types = pokemon.types.map(typeinfo => typeinfo.type.name)

//     const p = document.createElement("p")
//     p.textContent = `${types.join(",")}`;
//     div.append(img,p)
//     PokemonContainer.append(div)

//   })
// }





