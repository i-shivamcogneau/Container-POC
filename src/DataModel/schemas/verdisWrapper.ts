import { v4 as uuidv4 } from 'uuid';

export function version(){
    return {
        "version": "1.0",
        "platform": "lcp",
        "uuid _version": 4
    };
}

export function date(){
    return new Date();
}

export function uuid(){
    return uuidv4();
}