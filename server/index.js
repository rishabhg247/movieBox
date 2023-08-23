import express from "express";
import cors from 'cors';
const app = express();
import mysql from "mysql2";
app.use(cors());
app.use(express.json());

//connect the database...
let db = mysql.createConnection({
  host:"localhost",user:"root",password:"password24@#",database:"moviebox"
})
db.connect((err) => {
    if (err) {console.log('Error:', err)} 
    else {console.log('Connected to the database.')}
});

//api to get favourite movies from database..
app.get('/getFavourites', (_, res) => {
  let selectQuery = 'SELECT * FROM favourites';
  db.query(selectQuery,(err,info) => {
    if (err) {console.log('Error:', err);
      res.status(500).json({ error: 'An error occurred while fetching favorites.' })} 
    else {res.status(200).json(info)}
    });
  });
  //api to add a favourite movie in database...
  app.post('/addMovie', (req, res) => {
    let { title,year,type,poster} = req.body;
    let insertQuery = 'INSERT INTO favourites (title, year, type, poster) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [title, year, type, poster], (err, _) => {
      if (err) {console.log('Error',err);
        res.status(500).json({ error: 'An error occurred while adding the movie.' });
      } else {res.status(200).json({ message: 'Movie added successfully' })}
    });
  });
  
  
  app.listen(8800, () => {console.log("Connected to port 8800")});