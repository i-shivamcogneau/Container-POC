// From Compiler

import * as lcp from './verdisWrapper';
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Gate_Entry {

@Prop({ type: String, required: true})
Vehicle_no : string;

@Prop({ type: String, default: lcp.date()})
TimeStamp: string;

@Prop({ type: String, required: true})
Parking_Slot: string;

@Prop({ type: String, default: lcp.uuid()})
ID: string;
}

export const Gate_Entry_MODEL = Gate_Entry.name;
export type Gate_EntryDocument = Gate_Entry & Document;
export const Gate_EntrySchema = SchemaFactory.createForClass(Gate_Entry);
