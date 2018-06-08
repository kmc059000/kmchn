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

export type ICommentSubscriber = (comment : IComment) => void;

interface ICommentStore {
    [key: number]: IComment,
}

interface ICommentSubscribers {
    [key: number]: ICommentSubscriber[],
}
  

const comments : ICommentStore = {};
const commentSubscriptions : ICommentSubscribers = {};

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

    public async subscribeToComment(id : number, subscriber : ICommentSubscriber) {
        commentSubscriptions[id] = commentSubscriptions[id] || [];
        commentSubscriptions[id].push(subscriber);

        let comment= comments[id];
        if (!comment) {
            const innerComment = await this.fetchComment(id);
            if (innerComment) {
                comments[id] = comment = innerComment;
            }
        }

        commentSubscriptions[id].forEach(sub => sub(comment));
    }

    public async unsubscribeToComment(id : number, subscriber : ICommentSubscriber) {
        commentSubscriptions[id] = commentSubscriptions[id].filter(x => x !== subscriber);
    }
} 