const fetch = require('cross-fetch');
const _ = require('lodash');

async function getTasks(req, res) {
    const { project, token } = req.body;

    try {
        const fetchedData = await fetch(`${project}/rest/api/2/search?jql=resolution+is+empty`, {
            method: 'get',
            headers: {
                'Authorization': `Basic ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await fetchedData.json();
        const { issues } = data;

        res.json(issues.map(issue => ({
            priority: _.get(issue, 'fields.priority.id'),
            storyPoints: null,
            author: _.get(issue, 'fields.creator.name'),
            title: _.get(issue, 'fields.summary'),
            description: _.get(issue, 'fields.issuetype.description'),
            id: _.get(issue, 'key'),
            date: _.get(issue, 'fields.created'),
            deadline: _.get(issue, 'fields.duedate'),
            sprint: null,
            type: _.get(issue, 'fields.issuetype.name'),
            tags: null,
            assignee: _.get(issue, 'fields.assignee.name')
        })));

    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getTasks
};
