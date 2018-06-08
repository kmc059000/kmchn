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

export type ISubscriber<T> = (x : T) => void;
interface IEntityStore<T> {
    [key : number] : T,
}
interface IEntitySubscribers<T> {
    [key: number]: Array<ISubscriber<T>>,
}


export type IStorySubscriber = ISubscriber<IStory>;
type IStoryStore = IEntityStore<IStory>;
type IStorySubscribers = IEntitySubscribers<IStory>;


export type ICommentSubscriber = ISubscriber<IComment>;
type ICommentStore = IEntityStore<IComment>;
type ICommentSubscribers = IEntitySubscribers<IComment>;
  

async function subscribe<T>(
    key : number,
    subscriber : ISubscriber<T>,
    store : IEntityStore<T>,
    subscribers : IEntitySubscribers<T>,
    fetcher : (key : number) => Promise<T>) {

    subscribers[key] = subscribers[key] || [];
    subscribers[key].push(subscriber);

    let entity = store[key];
    if (!entity) {
        const loadedEntity = await fetcher(key);
        if (loadedEntity) {
            store[key] = entity = loadedEntity;
        }
    }

    // todo not sure why the type signature has to be provided here
    const entitySubscribers : Array<ISubscriber<T>> = subscribers[key];
    entitySubscribers.forEach(sub => sub(entity));
}

function unsubscribe<T>(key : number, subscriber : ISubscriber<T>, subscribers : IEntitySubscribers<T>,) {
    const entitySubscribers : Array<ISubscriber<T>> = subscribers[key];
    subscribers[key] = entitySubscribers.filter(x => x !== subscriber);
}

const stories : IStoryStore = {};
const storySubscriptions : IStorySubscribers = {};

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
        subscribe(id, subscriber, comments, commentSubscriptions, x => this.fetchComment(x));
    }

    public async unsubscribeToComment(id : number, subscriber : ICommentSubscriber) {
        unsubscribe(id, subscriber, commentSubscriptions);
    }

    public async subscribeToStory(id : number, subscriber : IStorySubscriber) {
        subscribe(id, subscriber, stories, storySubscriptions, x => this.fetchStory(x));
    }

    public async unsubscribeToStory(id : number, subscriber : IStorySubscriber) {
        unsubscribe(id, subscriber, storySubscriptions);
    }
} 