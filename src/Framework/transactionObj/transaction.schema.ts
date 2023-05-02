import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Transaction {
    @Prop({ type: Object, 
        default: {
            "version": "1.0",
            "platform": "lcp",
            "uuid _version": 4
        }
    })
    verdis: {"version": string, "platform": string, "uuid_version": number };

    @Prop({ type: String, default: uuidv4})
    uuid: string;

    @Prop({ type: Object, 
        default: {
            "start": Date.now(),
            "end": Date.now()
        }})
    lifecycle: { "start": Date, "end": Date };


    // from here
    @Prop({ type: [{
        "task_event": String,
        "task_name": String,
        "task_status": String,
        "time": String
    }], default: []})
    events: {
        "task_event": string,
        "task_name": string,
        "task_status": string,
        "time": string
    }[];

    
    @Prop({ type: [{
        "object_type": String,
        "object_uuid": String
    }], default: []})
    references: { "object_type": String, "object_uuid": String}[];
    ;

}

export const Transaction_MODEL = Transaction.name;
export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);





// {
//     "filter": {
//         "uuid": "fabdc523-9ca6-4930-b661-4937d3503366"
//     },
//     "verdis": {
//         "version": "1.0",
//         "platform": "lcp",
//         "uuid_version": 4
//     },
//     "events": [],
//     "references": []
// }
