import React, { useEffect, useState } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {

  const [pokemonArray, setPokemonArray] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/pokemon')
    .then((r) => r.json())
    .then((pokemons) => setPokemonArray(pokemons))
  }, [])

  const pokemonDisplay = pokemonArray.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  function handlePost(newPoke) {
    const updatedArray = [...pokemonArray, newPoke];
    setPokemonArray(updatedArray);
  }

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm handlePost={handlePost} />
      <br />
      <Search onSearch={setSearch} />
      <br />
      <PokemonCollection pokemonDisplay={pokemonDisplay} />
    </Container>
  );
}

export default PokemonPage;
