class JsonMapper {
    map = gitIssues => {
        const dict = new Map([['title', 'title'],
            ['id', 'number'], ['description', 'body'], ['date', 'created_at']]);

        const issues = gitIssues
            .filter(gitIssue => !gitIssue.pull_request)
            .map(gitIssue => this.mapIssue(gitIssue, dict));

        return issues;
    }

    mapIssue = (gitIssue, dict) => {
        const issue = {};

        dict.forEach((value, key) => {
            issue[key] = gitIssue[value];
        });

        this.extractUser(issue, gitIssue);
        this.extractAssignee(issue, gitIssue);
        this.extractType(issue, gitIssue);
        this.extractTags(issue, gitIssue);
        this.extractOther(issue, gitIssue);

        return issue;
    }

    getType = labels => {
        const types = new Set(['bug', 'feature', 'question', 'test']);

        for (const { name } of labels) {
            if (types.has(name)) {
                return name;
            }
        }

        return 'issue';
    }

    extractType = (issue, gitIssue) => {
        issue.type = this.getType(gitIssue.labels);
    }

    extractTags = (issue, gitIssue) => {
        issue.tags = gitIssue.labels
            .map(label => label.name)
            .filter(name => name !== issue.type);
    }

    extractUser = (issue, gitIssue) => {
        if (gitIssue.user) {
            issue.author = gitIssue.user.login;
        }
    }

    extractAssignee = (issue, gitIssue) => {
        if (issue.assignee) {
            issue.assign = gitIssue.assignee.login;
        }
    }

    extractOther = (issue, gitIssue) => {
        issue.other = { assignees: gitIssue.assignees.map(assignee => assignee.login) };
    }
}

export default JsonMapper;
