import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction_MODEL, TransactionDocument } from "./transaction.schema";

@Injectable()
export class TransactionService {
  constructor( @InjectModel(Transaction_MODEL) private readonly TransactionModel: Model<TransactionDocument> ) {}

  async PostTran(req={}) {  // create new transaction object
    const createdObject = await this.TransactionModel.create(req);
    return createdObject;
  }

  async PutTran(req) {
    const updatedJob = await this.TransactionModel.findOneAndUpdate(req.filter, req.updateData);

    return updatedJob;
  }

  async DeleteTran(req) {
    const result = await this.TransactionModel.deleteOne(req.filter);

    if (result.deletedCount === 0) {
      return { message: 'Object not found' };
    }
    return { message: 'Object deleted successfully' };
  }

  async GetTran(req) {
    const getObj = await this.TransactionModel.findOne(req.filter);

    if (!getObj) {
      return 'No object';
    }

    return getObj;
  }


  async PostTranRef(req) {
    const getJob = await this.TransactionModel.findOne(req.filter);
    
    getJob["references"].push(req.object);
    
    const updatedJob = await this.TransactionModel.findOneAndUpdate(req.filter, getJob);

    return getJob;
  }

  async PostTranEvent(req) {
    const getJob = await this.TransactionModel.findOne(req.filter);
    
    getJob["eventsp"].push(req.object);
    
    const updatedJob = await this.TransactionModel.findOneAndUpdate(req.filter, getJob);

    return getJob;
  }
}


// {
//   "filter": {
//       "uuid": "fabdc523-9ca6-4930-b661-4937d3503366"
//   },
//   "verdis": {
//       "version": "1.0",
//       "platform": "lcp",
//       "uuid_version": 4
//   },
//   "events": [],
//   "references": []
// }
