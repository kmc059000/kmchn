
export type ISubscriber<T> = (x : T) => void;
export interface IEntityStore<T> {
    [key : number] : T,
}

export interface IEntitySubscribers<T> {
    [key: number]: Array<ISubscriber<T>>,
}


export class SubscriptionManager<T> {
    private store: IEntityStore<T>;
    private subscribers: IEntitySubscribers<T>;
    constructor() {
        this.store = {};
        this.subscribers = {};
    }

    public async subscribe(
        key : number,
        subscriber : ISubscriber<T>,
        fetcher : (key : number) => Promise<T | null>) {
    
        this.subscribers[key] = this.subscribers[key] || [];
        this.subscribers[key].push(subscriber);
    
        let entity = this.store[key];
        if (!entity) {
            const loadedEntity = await fetcher(key);
            if (loadedEntity) {
                this.store[key] = entity = loadedEntity;
            }
        }
    
        // todo not sure why the type signature has to be provided here
        const entitySubscribers : Array<ISubscriber<T>> = this.subscribers[key];
        entitySubscribers.forEach(sub => sub(entity));
    }
    
    public unsubscribe(key : number, subscriber : ISubscriber<T>) {
        const entitySubscribers : Array<ISubscriber<T>> = this.subscribers[key];
        this.subscribers[key] = entitySubscribers.filter(x => x !== subscriber);
    }
}
