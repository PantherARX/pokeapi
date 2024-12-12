import { useEffect, useState } from 'react'
import axios, { isAxiosError } from "axios";
import './App.css'
import './reset.css'


function App() {

  const [data, setData] = useState();
  const [name, setName] = useState("bulbasaur");
  const [inputValue, setInput] = useState();

  const inputChange = e => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    setName(inputValue.toLowerCase());
  }

  
  let url = "https://pokeapi.co/api/v2/pokemon/"

  useEffect(() => {
    async function getPokemon() {
      try {
        const res = await axios.get(url + `${name}`)
        setData(res.data)
        setName(res.data.name)
        if (res.data.id > 151) {
          setName("bulbasaur")
          throw new Error("Only the first 151 Pokemons are available");
        }
          
      } catch (error) {
        console.log(error.response.status)
        if (error.response.status === 404) {
          window.alert("Pokemon not found")
          setName("bulbasaur")
        } else {
          window.alert(error)
          setName("bulbasaur")
        }
        
      }
    }
    getPokemon()
  },[name])

  return (
    <>
      <div className="app">
        <img src="/src/assets/img/pokemon.svg" alt="" className='logo' />
        <div className='search_container'>
        <input className='text_field-pokemon' type="text" value={inputValue} onChange={inputChange} placeholder='Pokemon Name or pokedex code'/>
        <button className='submit_button' type="submit" onClick={handleClick}>Submit</button>
        </div>
        <h2 className='pokemon_name'>{name.charAt(0).toUpperCase()+name.slice(1)}</h2>
        <img className='pokemon_sprite' src={data ? data.sprites.versions["generation-i"]["red-blue"].front_default : "<p>Loading</p>"} alt="" />
        <div className="types">
        {data ? data.types.map((value, key) => {
          return (
            <div className='pokemon_types' key={key}>
              
              {value.type.name.charAt(0).toUpperCase() + value.type.name.slice(1)}
            </div>
          )
        }):""}
        </div>
        <p>Abilities</p>
        {data ? data.abilities.map((value, key) => {
          return (
            <div key={key}>
              {value.ability.name.charAt(0).toUpperCase() + value.ability.name.slice(1)}
            </div>
          )
        }):""}
      </div>
    </>
  )
}

export default App
