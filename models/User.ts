
import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number
}


export class User {

    public events:Eventing = new Eventing();

    public sync:Sync<UserProps> = new Sync<UserProps>('http://localhost:3000/users');
    
    public attributes:Attributes<UserProps>;

    constructor(attrs: UserProps){
        this.attributes = new Attributes<UserProps>(attrs);
    }

    get on(): Function {
        return this.events.on;
    }

     get trigger(): Function {
        return this.events.trigger;
    }

    get get(): Function {
        return this.attributes.get;
    }
    
    set(update: UserProps):void {
        this.set(update);
        this.events.trigger('change');
    }

    fetch():void {
        const id = this.get('id');
        if(typeof id !== 'number'){
            throw Error('Cannot fetch without an id');
        }
        this.sync.fetch(id)
        .then((response: AxiosResponse):void => {
            this.set(response.data);
        });
    }
    
}