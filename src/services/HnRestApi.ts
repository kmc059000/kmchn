import * as Models from '../models/Models';

const endpoint = 'https://hacker-news.firebaseio.com/v0';
const options = {
    headers: {
        'Accept': 'application/json'
    },
    method: 'GET',
};

export class HnRestApi {
    public async fetchTopStories() {
        const response = await fetch(`${endpoint}/topstories.json`, options);
        if (response.ok) {
            const result = await response.json();
            return result as number[];
        }

        return [];        
    }
    public async fetchStory(id : number) {
        const response = await fetch(`${endpoint}/item/${id}.json`, options);
        if (response.ok) {
            const result = await response.json();
            return result as Models.IStory;
        }

        return null;
    }

    public async fetchComment(id : number) {
        const response = await fetch(`${endpoint}/item/${id}.json`, options);
        if (response.ok) {
            const result = await response.json();
            return result as Models.IComment;
        }

        return null;
    }
} 
