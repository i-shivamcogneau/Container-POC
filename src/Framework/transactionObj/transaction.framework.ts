import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import * as lcp from '../verdisWrapper';

@Injectable()
export class verdis_transaction {           //verdis_persistance
    constructor(
        private transactionService: TransactionService
    ) {}

    create() {
        let req= {};
        req["lifecycle"] = { "start": lcp.date(), "end": "" };
        req["uuid"] = lcp.uuid();
        req["verdis"] = lcp.version();

        return this.transactionService.PostTran(req);
    }

    delete(objuuid) {
        let req= {};
        req["filter"] = {"uuid" : objuuid};

        return this.transactionService.DeleteTran(req);
    }  
    
    get(objuuid) {
        let req= {};
        req["filter"] = {"uuid" : objuuid};

        return this.transactionService.GetTran(req);
    }


    getReferences(objuuid){        
        let req= {};
        req["filter"] = {"uuid" : objuuid};

        var tranobj = this.transactionService.GetTran(objuuid);
        return tranobj["references"];
    }

    getEvents(objuuid){
        let req= {};
        req["filter"] = {"uuid" : objuuid};

        var tranobj = this.transactionService.GetTran(objuuid);
        return tranobj["events"];
    }


    async addEvents(eventObj, objuuid){
        let req= {};
        req["filter"] = {"uuid" : objuuid};
        var tranobj = await this.transactionService.GetTran(req);
        
        eventObj["time"] = lcp.date();
        tranobj["events"].push(eventObj);
        req["updateData"] = {"events": tranobj["events"]};

        var somethingelse = await  this.transactionService.PutTran(req);
        return tranobj;
    }
    
    
    async addReferences(refObj, objuuid){
        let req= {};
        req["filter"] = {"uuid" : objuuid};
        var tranobj = await this.transactionService.GetTran(req);

        tranobj["references"].push(refObj);
        req["updateData"] = {"references": tranobj["references"]};
        var somethingelse = await this.transactionService.PutTran(req);
        return tranobj;
    }

}