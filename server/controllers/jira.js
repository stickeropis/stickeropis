const fetch = require('cross-fetch');

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
            priority: issue.fields.priority.id,
            storyPoints: null,
            author: issue.fields.creator.name,
            title: issue.fields.summary,
            description: issue.fields.issuetype.description,
            id: issue.key,
            date: issue.fields.created,
            deadline: issue.fields.duedate,
            sprint: null,
            type: issue.fields.issuetype.name,
            tags: null,
            assignee: issue.fields.assignee.name
        })));

    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getTasks
};
