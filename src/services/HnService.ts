import * as Models from '../models/Models';
import { HnRestApi } from './HnRestApi';
import { ISubscriber, SubscriptionManager } from './Subsciptions';


class HnSubscriptionService {
    private api : HnRestApi;
    private commentManager : SubscriptionManager<Models.IComment>;
    private storyManager : SubscriptionManager<Models.IStory>;
    constructor() {
        this.api = new HnRestApi();
        this.storyManager = new SubscriptionManager<Models.IStory>(this.api.fetchStory);
        this.commentManager = new SubscriptionManager<Models.IComment>(this.api.fetchComment);
    }

    public async subscribeToComment(id : number, subscriber : ISubscriber<Models.IComment>) {
        this.commentManager.subscribe(id, subscriber);
    }

    public async unsubscribeToComment(id : number, subscriber : ISubscriber<Models.IComment>) {
        this.commentManager.unsubscribe(id, subscriber);
    }

    public async subscribeToStory(id : number, subscriber : ISubscriber<Models.IStory>) {
        this.storyManager.subscribe(id, subscriber);
    }

    public async unsubscribeToStory(id : number, subscriber : ISubscriber<Models.IStory>) {
        this.storyManager.unsubscribe(id, subscriber);
    }
} 

export const HnService = new HnSubscriptionService();