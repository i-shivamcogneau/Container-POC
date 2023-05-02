// From Compiler

import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Truck_Document_MODEL, Truck_DocumentDocument } from './schemas/Truck_Document.schema';

@Injectable()
export class Truck_DocumentService {
    constructor(
        @InjectModel(Truck_Document_MODEL) private readonly Truck_DocumentModel: Model < Truck_DocumentDocument >
    ) {}

    async PostObj(req) {
        const createdObject = await this.Truck_DocumentModel.create(req);
        return createdObject;
    }
    async PutObj(req) {
        const updatedJob = await this.Truck_DocumentModel.findOneAndUpdate(req.filter, req.updateData, {
            new: true,
        });
        return updatedJob;
    }
    async DeleteObj(req) {
        const result = await this.Truck_DocumentModel.deleteOne(req.filter);
        return result.deletedCount === 0 ? false : 'Object deleted';
    }
    async GetObj(req) {
        const getObj = await this.Truck_DocumentModel.findOne(req.filter);
        return !getObj ? false : getObj;
    }
}