// From Compiler

import * as lcp from './verdisWrapper';
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Store_Details {

@Prop({ type: String, required: true})
Name: string;

@Prop({ type: String, required: true})
Location: string;

@Prop({ type: Number})
parking_slots: number;

@Prop({ type: String, default: lcp.uuid()})
ID: string;

@Prop({ type: Object})
lifecycle: object;
}

export const Store_Details_MODEL = Store_Details.name;
export type Store_DetailsDocument = Store_Details & Document;
export const Store_DetailsSchema = SchemaFactory.createForClass(Store_Details);
