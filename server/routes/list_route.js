const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Select all rows from the DB table using SQL query
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "toDoList" ORDER BY "id";`
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error with get request', error);
        res.sendStatus(500);
    })
});

// Insert new row with values from AJAX POST into the DB table
router.post('/', (req, res) => {
    
    let task = req.body.task;
    
    let queryText = `INSERT INTO "toDoList" ("task", "complete")
    VALUES ($1, 'false');`;
    // Only the task text was needed to be variable, the incoming tasks are inherently incomplete
    pool.query(queryText, [task]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Delete selected row using an ID parameter sent from the client using AJAX
router.delete('/:idParam', (req, res) => {
    let queryText = `DELETE FROM "toDoList" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.idParam]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Edit the selected "complete" boolean using AJAX 
router.put('/:idParam', (req, res) => {
    let queryText = `UPDATE "toDoList" SET "complete" = true WHERE "id" = $1`;
    pool.query(queryText, [req.params.idParam]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;