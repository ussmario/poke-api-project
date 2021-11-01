const express = require('express');
const axios = require('axios').default;

const app = express();
const PORT = process.env.PORT || 3000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

async function getOnlineData(input) {
  const data = await axios(`https://pokeapi.co/api/v2/pokemon/${input}`);
  let newPokemon = {};
  newPokemon.name = data.data.name;
  newPokemon.id = data.data.id;
  newPokemon.weight = data.data.weight;
  newPokemon.height = data.data.height;
  newPokemon.image = data.data.sprites.front_default
  return newPokemon;
}

app.use(express.json());

app.get('/api/:input', async function(req, res) {
  var  pokemon_name = req.params.input

  let result = await knex
    .select('*')
    .from('pokemon_table')
    .where("name", pokemon_name)
    .then(data => {
      if (data.length > 0) res.status(200).send(data)
      else {
        return pokemon = getOnlineData(pokemon_name)
      }
    })
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );

    knex('pokemon_table')
      .insert({name: result.name,
          poke_id: result.id, 
          height: result.height,
          weight: result.weight,
          image_url: result.image})
      .then(()=>{});

    return res.status(200).json(result);
});

app.get('/api/:input/img', async function(req, res) {
  var  pokemon_name = req.params.input
  let result = await knex
    .select('pokemon_table.image_url')
    .from('pokemon_table')
    .where("name", pokemon_name)
    .then(data => {
      if (data.length > 0) res.status(200).send(data)
      else {
        res.status(404).send('Could not find that pokemon in our database, please search for pokemon at /api/:pokemon_name')
      }
    })
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
})

app.get('/api/pokemon', async function(req, res) {
  let result = await knex
    .select('pokemon_table.name')
    .from('pokemon_table')
    .then(data => {
      if (data.length > 0) res.status(200).json(data)
    })
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});