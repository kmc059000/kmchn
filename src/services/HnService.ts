import { HnRestApi, IComment, IStory } from './HnRestApi';
import { ISubscriber, SubscriptionManager } from './Subsciptions';

class HnSubscriptionService {
    private api : HnRestApi;
    private commentManager : SubscriptionManager<IComment>;
    private storyManager : SubscriptionManager<IStory>;
    constructor() {
        this.api = new HnRestApi();
        this.storyManager = new SubscriptionManager<IStory>(this.api.fetchStory);
        this.commentManager = new SubscriptionManager<IComment>(this.api.fetchComment);
    }

    public async subscribeToComment(id : number, subscriber : ISubscriber<IComment>) {
        this.commentManager.subscribe(id, subscriber);
    }

    public async unsubscribeToComment(id : number, subscriber : ISubscriber<IComment>) {
        this.commentManager.unsubscribe(id, subscriber);
    }

    public async subscribeToStory(id : number, subscriber : ISubscriber<IStory>) {
        this.storyManager.subscribe(id, subscriber);
    }

    public async unsubscribeToStory(id : number, subscriber : ISubscriber<IStory>) {
        this.storyManager.unsubscribe(id, subscriber);
    }
} 

export const HnService = new HnSubscriptionService();