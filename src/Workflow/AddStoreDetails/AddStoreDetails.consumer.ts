// From Compiler

import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { FrameworkService } from "./TaskQueueFramework";
import { FrameworkObjectService } from "../../DataModel/DataModelFramework";
import { verdis_transaction } from "../../Framework/transactionObj/transaction.framework";

@Processor('ToAddStoreQueue')
export class AddingStoreDetailsConsumer {
        constructor(private readonly frameworkService: FrameworkService,
                private readonly frameworkObjectService: FrameworkObjectService,
                private readonly verdis_transaction: verdis_transaction) {}
        @Process('AddingStoreDetailsJob')
        async AddingStoreDetailsOperationJob(job: Job < unknown > ) {
                var Obj = job.data["transacObj"];
                await this.verdis_transaction.addEvents({
                        "task_event": "Start",
                        "task_name": "AddingStoreDetails",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

                //code
                var StoreID = await this.frameworkObjectService.create("Store_Details", Obj.data);
                this.verdis_transaction.addReferences({
                        "object_type": "Store_Details",
                        "object_uuid": StoreID.ID
                }, Obj.Transaction_Obj.uuid);
                await this.verdis_transaction.addEvents({
                        "task_event": "End",
                        "task_name": "AddingStoreDetails",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

        }
}