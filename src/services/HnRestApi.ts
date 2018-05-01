const endpoint = 'https://hacker-news.firebaseio.com/v0';
const options = {
    headers: {
        'Accept': 'application/json'
    },
    method: 'GET',
};

export default class HnRestApi {
    public async fetchTopStories() {
        const response = await fetch(`${endpoint}/topstories.json`, options);
        if (response.ok) {
            const result = await response.json();
            return result as number[];
        }

        return [];        
    }
    public fetchStory(id : number) {
        return fetch(`${endpoint}/item/${id}.json`, options);
    }
} 