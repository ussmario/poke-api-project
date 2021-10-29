const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const knex = require('knex')(require('/home/ussmario/sdi/debug/poke-api-project/knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());

app.get('/api', (req, res) => {
  knex
    .select('*')
    .from('pokemon_table')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});




// const express = require('express');
// const knex = require('knex')
// (require('/home/ussmario/sdi/debug/poke-api-project/knexfile.js')[process.env.NODE_ENV||'development'])


// const port = 3000;

// app.listen(port, () => {
//   console.log(`my poke server is running at http://localhost:${port}`)
// });

// const app = express();

// app.get('/api', (req, res) => {

// })