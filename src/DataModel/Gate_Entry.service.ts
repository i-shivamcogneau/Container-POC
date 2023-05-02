// From Compiler

import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Gate_Entry_MODEL, Gate_EntryDocument } from './schemas/Gate_Entry.schema';

@Injectable()
export class Gate_EntryService {
    constructor(
        @InjectModel(Gate_Entry_MODEL) private readonly Gate_EntryModel: Model < Gate_EntryDocument >
    ) {}

    async PostObj(req) {
        const createdObject = await this.Gate_EntryModel.create(req);
        return createdObject;
    }
    async PutObj(req) {
        const updatedJob = await this.Gate_EntryModel.findOneAndUpdate(req.filter, req.updateData, {
            new: true,
        });
        return updatedJob;
    }
    async DeleteObj(req) {
        const result = await this.Gate_EntryModel.deleteOne(req.filter);
        return result.deletedCount === 0 ? false : 'Object deleted';
    }
    async GetObj(req) {
        const getObj = await this.Gate_EntryModel.findOne(req.filter);
        return !getObj ? false : getObj;
    }
}