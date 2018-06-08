const endpoint = 'https://hacker-news.firebaseio.com/v0';
const options = {
    headers: {
        'Accept': 'application/json'
    },
    method: 'GET',
};

export interface IStory {
  id: number,
  by: string,
  decsendants: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
}

export interface IComment {
    id: number,
    by: string,
    kids: number[],
    text: string,
    time: number,
    type: string,
  }

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
            return result as IStory;
        }

        return null;
    }

    public async fetchComment(id : number) {
        const response = await fetch(`${endpoint}/item/${id}.json`, options);
        if (response.ok) {
            const result = await response.json();
            return result as IComment;
        }

        return null;
    }
} 
