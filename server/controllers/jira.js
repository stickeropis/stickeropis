const fetch = require('cross-fetch');

async function getJiraTasks(req, res) {
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

        res.json(issues.map(e => ({
            priority: e.fields.priority.id,
            storyPoints: null,
            author: e.fields.creator.name,
            title: e.fields.summary,
            description: e.fields.issuetype.description,
            id: e.key,
            date: e.fields.created,
            deadline: e.fields.duedate,
            sprint: null,
            type: e.fields.issuetype.name,
            tags: null,
            assignee: e.fields.assignee
        })));

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getJiraTasks
};
