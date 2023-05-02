// From Compiler

import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { FrameworkService } from "./TaskQueueFramework";
import { FrameworkObjectService } from "../../DataModel/DataModelFramework";
import { verdis_transaction } from "../../Framework/transactionObj/transaction.framework";

@Processor('TruckatGateQueue')
export class TruckDocCollConsumer {
        constructor(private readonly frameworkService: FrameworkService,
                private readonly frameworkObjectService: FrameworkObjectService,
                private readonly verdis_transaction: verdis_transaction) {}
        @Process('TruckDocCollJob')
        async TruckDocCollOperationJob(job: Job < unknown > ) {
                var Obj = job.data["transacObj"];
                Obj.Transaction_Obj = await this.verdis_transaction.addEvents({
                        "task_event": "Start",
                        "task_name": "TruckDocColl",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

                // code
                var StoreID = await this.frameworkObjectService.create("Truck_Document", Obj.data);
                Obj.Transaction_Obj = await this.verdis_transaction.addReferences({
                        "object_type": "truck_documents",
                        "object_uuid": StoreID.ID
                }, Obj.Transaction_Obj.uuid);

                Obj.Transaction_Obj = await this.verdis_transaction.addEvents({
                        "task_event": "End",
                        "task_name": "TruckDocColl",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

                this.frameworkService.DoNext(Obj, "TruckDocColl")
        }
}
@Processor('DocToDoQueue')
export class DocVeriConsumer {
        constructor(private readonly frameworkService: FrameworkService,
                private readonly frameworkObjectService: FrameworkObjectService,
                private readonly verdis_transaction: verdis_transaction) {}
        @Process('DocVeriJob')
        async DocVeriOperationJob(job: Job < unknown > ) {
                var Obj = job.data["transacObj"];
                Obj.Transaction_Obj = await this.verdis_transaction.addEvents({
                        "task_event": "Start",
                        "task_name": "DocVeri",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

                // code
                var TruckDocID = Obj.Transaction_Obj.references[0]["object_uuid"];
                var StoreDetailID = Obj.data.StoreID;

                var TruckDoc = await this.frameworkObjectService.get('Truck_Document', {
                        "ID": TruckDocID
                });
                var StoreDetail = await this.frameworkObjectService.get('Store_Details', {
                        "ID": StoreDetailID
                });

                if (TruckDoc.Client != StoreDetail.Name || TruckDoc.Shipped_To != StoreDetail.Location) {
                        console.log("Document Invalid, Please resubmit Documents");
                        return;
                }


                Obj.Transaction_Obj = await this.verdis_transaction.addEvents({
                        "task_event": "End",
                        "task_name": "DocVeri",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

                this.frameworkService.DoNext(Obj, "DocVeri")
        }
}
@Processor('NowParkQueue')
export class AllotParkSlotConsumer {
        constructor(private readonly frameworkService: FrameworkService,
                private readonly frameworkObjectService: FrameworkObjectService,
                private readonly verdis_transaction: verdis_transaction) {}
        @Process('AllotParkSlotJob')
        async AllotParkSlotOperationJob(job: Job < unknown > ) {
                var Obj = job.data["transacObj"];
                Obj.Transaction_Obj = await this.verdis_transaction.addEvents({
                        "task_event": "Start",
                        "task_name": "AllotParkSlot",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

                // Code
                var TruckDocID = Obj.Transaction_Obj.references[0]["object_uuid"];
                var TruckDoc = await this.frameworkObjectService.get('Truck_Document', {"ID": TruckDocID});
                var Gate_EntryDoc = await this.frameworkObjectService.create("Gate_Entry", {"Vehicle_no": TruckDoc.Truck_no, "Parking_Slot": Obj.data.PS_gate_entry});
                Obj.Transaction_Obj = await this.verdis_transaction.addReferences({
                        "object_type": "Gate_Entry",
                        "object_uuid": Gate_EntryDoc.ID
                }, Obj.Transaction_Obj.uuid);


                Obj.Transaction_Obj = await this.verdis_transaction.addEvents({
                        "task_event": "End",
                        "task_name": "AllotParkSlot",
                        "task_status": ""
                }, Obj.Transaction_Obj.uuid);

                console.log(Obj.Transaction_Obj.uuid);
        }
}