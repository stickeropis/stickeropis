import fetch from 'cross-fetch';

import JsonMapper from './json-mapper';

class IssuesExtractor {
    constructor() {
        this.jsonMapper = new JsonMapper();
    }

    extract(token, owner, repo) {
        return fetch(`https://api.github.com/repos/${owner}/${repo}/issues?access_token=${token}` +
        '&per_page=100')
            .then(res => res.json())
            .then(this.jsonMapper.map);
    }
}

export default IssuesExtractor;
