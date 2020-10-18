const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "toDoList" ORDER BY "id";`
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error with get request', error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    
    let task = req.body.task;
    
    let queryText = `INSERT INTO "toDoList" ("task", "complete")
    VALUES ('${task}', 'false');`;
    pool.query(queryText).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.delete('/:idParam', (req, res) => {
    console.log('hello from delete', req.params.idParam);
    let queryText = `DELETE FROM "toDoList" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.idParam]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

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