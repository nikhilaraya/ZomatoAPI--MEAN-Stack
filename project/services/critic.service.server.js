var app = require('../../express');

var criticModel = require('../models/critic/critic.model.server');

app.post('/api/critic/new',createFinding);
app.get('/api/critic/:userId',findAllFindingsForUser);
app.get('/api/finding/:findingId',getFinding);
app.put('/api/finding/:findingId',editFinding);
app.delete('/api/finding/:findingId',deleteFinding);
app.get('/api/findings',findAllFindings);

function findAllFindings(req,res) {
    criticModel.findAllFindings()
        .then(function (findings) {
        res.json(findings);
    })
}
function deleteFinding(req,res) {
    var findingId = req.params.findingId;
    criticModel
        .deleteFinding(findingId)
        .then(function (finding) {
        res.send(finding);
    })
}

function editFinding(req,res) {
    var findingId = req.params.findingId;
    var newFinding = req.body;
    console.log(newFinding+findingId);
    criticModel
        .updateFinding(findingId,newFinding)
        .then(function (finding) {
        res.send(finding);
    })
}

function getFinding(req,res) {
    var findingId = req.params.findingId;
    criticModel
        .getFindingById(findingId)
        .then(function (finding) {
            if(finding)
            {
                res.json(finding);
            }
            else {
                res.json(null);
            }

        })
}

function findAllFindingsForUser(req,res) {
    console.log("here")
    var userId = req.params.userId;
    criticModel
        .getFindingsForUser(userId)
        .then(function (findings) {
            if(findings)
            {
                res.json(findings);
            }
            else
            {
                res.json(null);
            }
        })
}

function createFinding(req,res) {
    var finding = req.body;
    criticModel
        .createFind(finding)
        .then(function (criticFind) {
            if(criticFind)
            {
                res.json(criticFind);
            }
            else {
                res.json(null);
            }
        })
}