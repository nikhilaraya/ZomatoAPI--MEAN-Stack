/**
 * Created by user on 17-08-2017.
 */
var mongoose = require('mongoose');
var criticSchema = require('./critic.schema.server');
var criticModel = mongoose.model('criticModel',criticSchema);

module.exports = criticModel;

criticModel.createFind = createFind;
criticModel.getFindingsForUser = getFindingsForUser;
criticModel.getFindingById = getFindingById;
criticModel.updateFinding = updateFinding;
criticModel.deleteFinding = deleteFinding;
criticModel.findAllFindings = findAllFindings;

function findAllFindings() {
    return criticModel.find();
}

function deleteFinding(findingId) {
    return criticModel.remove({_id: findingId});
}
function updateFinding(findingId,finding) {
    return criticModel.update({_id:findingId},{$set: finding});
}

function getFindingById(findingId) {
    return criticModel.findById(findingId);
}

function getFindingsForUser(userId) {
    return criticModel.find({userId : userId});
}

function createFind(finding) {
    return criticModel.create(finding);
}