// From Compiler

import * as lcp from './verdisWrapper';
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Truck_Document {

@Prop({ type: String, required: true})
Truck_no: string;

@Prop({ type: String, required: true})
Client: string;

@Prop({ type: String, required: true})
Shipped_To: string;

@Prop({ type: String})
Date: string;

@Prop({ type: String, default: lcp.uuid()})
ID: string;

@Prop({ type: Object})
lifecycle: object;
}

export const Truck_Document_MODEL = Truck_Document.name;
export type Truck_DocumentDocument = Truck_Document & Document;
export const Truck_DocumentSchema = SchemaFactory.createForClass(Truck_Document);
