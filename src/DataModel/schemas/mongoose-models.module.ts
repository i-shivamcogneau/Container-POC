// From Compiler

import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Store_Details_MODEL, Store_DetailsSchema } from "./Store_Details.schema";
import { Truck_Document_MODEL, Truck_DocumentSchema } from "./Truck_Document.schema";
import { Gate_Entry_MODEL, Gate_EntrySchema } from "./Gate_Entry.schema";

const MODELS = [
{ name: Store_Details_MODEL, schema: Store_DetailsSchema },
{ name: Truck_Document_MODEL, schema: Truck_DocumentSchema },
{ name: Gate_Entry_MODEL, schema: Gate_EntrySchema },
];

@Global()
@Module({
imports: [MongooseModule.forFeature(MODELS)],
exports: [MongooseModule],
})
export class MongooseModelsModule {}