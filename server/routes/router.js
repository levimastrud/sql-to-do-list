const { response } = require('express');
const express = require('express');
const listRouter = express.Router();

// Database connection

const pool = require('../modules/pool.js');

// GET

listRouter.get('/', (req, res) => {
    console.log('in list GET');
    pool.query(`SELECT * FROM "tasks" ORDER BY id`)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error geting list', error);
        })
})

// POST

listRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`Adding task ${newTask}`)
    let queryString = `INSERT INTO tasks ("task") VALUES ($1);`;
    pool.query(queryString, [newTask.task])
    .then(result => {
        res.sendStatus(204);
    }).catch(error => {
        res.send(`error with POST`, error)
    })
});

// DELETE
 
listRouter.delete('/:taskid', (req, res) => {
    let queryString = `DELETE FROM tasks WHERE id = $1`;
    console.log(req.params)
    pool.query(queryString, [req.params.taskid])
    .then(result => {
        res.send('Deleting')
    }).catch(error => {
        res.send(`error with delete`, error)
    })
});

// PUT
// Marking complete

listRouter.put('/:taskid', (req, res) => {
    console.log(req.params.taskid)
    const taskid = req.params.taskid;
    const queryString = `UPDATE "tasks" SET "is_complete" = NOT "is_complete" WHERE "id" = $1`; // I thought I was going insane because I was using "isComplete" . . .  FML
    pool.query(queryString, [taskid])
        .then(response => {
            res.send('updating task:', taskid, response)
        }).catch(error => {
            res.send('Error putting')
        })
});

// Export Router

module.exports = listRouter;