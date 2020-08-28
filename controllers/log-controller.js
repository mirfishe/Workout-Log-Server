const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log');

const validateSession = require('../middleware/validate-session');


/* ***********************************
 *** Create Log ***
*********************************** */
router.post('/', validateSession, (req, res) => {

    const createLog = {
        description:    req.body.log.description,
        definition:     req.body.log.definition,
        result:         req.body.log.result,
        owner_id:       req.user.id
    };

    Log.create(createLog)
    .then(log => res.status(200).json({
        log:     log,
        message:    `${log.description} was added.`
    }))
    .catch(err => res.status(500).json({error: err}))
});


/* ***********************************
 *** Get Logs By User ***
*********************************** */
router.get('/', validateSession, (req, res) => {

    const query = {where: {owner_id: req.user.id}};

    Log.findAll(query)
    .then(logs => res.status(200).json({
        message:    `There are a total of ${logs.length} log entries.`,
        logs:     logs
    }))
    .catch(err => res.status(500).json({error: err}))
});


/* ***********************************
 *** Get Log By User ***
*********************************** */
router.get('/:id', validateSession, (req, res) => {

    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    Log.findOne(query)
    .then(log => res.status(200).json({
        message:    `Found this log entry: ${log.description}.`,
        log:     log
    }))
    .catch(err => res.status(500).json({error: err}))
});


/* ***********************************
 *** Update Log  ***
*********************************** */
// Not updating
router.put('/:id', validateSession, (req, res) => {

    const updateLogEntry = {
        description:  req.body.log.description,
        definition:   req.body.log.definition,
        result:  req.body.log.result
    };

    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    // Log.update(req.body, query)
    Log.update(updateLogEntry, query)
    .then(recordsChanged => res.status(200).json({
        message:    `${recordsChanged} log entry was updated.`
    }))
    .catch(err => res.status(500).json({error: err}))
});


/* ***********************************
 *** Delete Log ***
*********************************** */
router.delete('/:id', validateSession, (req, res) => {

    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    Log.destroy(query)
    .then(recordsChanged => {
            if (recordsChanged !== 0) {
                res.status(200).json({
                message: 'Log was deleted.',
                numberOfRecordsChanged: `${recordsChanged} record(s) were changed.`
                })
            } else {
                res.status(202).json({
                    message: 'Log was already deleted.',
                    numberOfRecordsChanged: `${recordsChanged} record(s) were changed.`
                })
            }
            })
    .catch(err => res.status(500).json({error: err}))
});


module.exports = router;