// From Compiler

import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Store_Details_MODEL, Store_DetailsDocument } from './schemas/Store_Details.schema';

@Injectable()
export class Store_DetailsService {
    constructor(
        @InjectModel(Store_Details_MODEL) private readonly Store_DetailsModel: Model < Store_DetailsDocument >
    ) {}

    async PostObj(req) {
        const createdObject = await this.Store_DetailsModel.create(req);
        return createdObject;
    }
    async PutObj(req) {
        const updatedJob = await this.Store_DetailsModel.findOneAndUpdate(req.filter, req.updateData, {
            new: true,
        });
        return updatedJob;
    }
    async DeleteObj(req) {
        const result = await this.Store_DetailsModel.deleteOne(req.filter);
        return result.deletedCount === 0 ? false : 'Object deleted';
    }
    async GetObj(req) {
        const getObj = await this.Store_DetailsModel.findOne(req.filter);
        return !getObj ? false : getObj;
    }
}