import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { verdis_transaction } from './Framework/transactionObj/transaction.framework';
import { FrameworkObjectService } from './DataModel/DataModelFramework';
import { FrameworkService as fs2 } from './Workflow/AddStoreDetails/TaskQueueFramework';
import { FrameworkService as fs1 } from './Workflow/GateEntryProc/TaskQueueFramework';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
        private readonly verdis_transaction: verdis_transaction,
        private readonly frameworkObjectService: FrameworkObjectService,
        private readonly frameworkService1: fs1,
        private readonly frameworkService2: fs2
    ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('tryTransaction')
  tryTransaction() {
    // return this.verdis_transaction.get("5b51fbe3-dfe5-4c0f-8637-25e140fdeff1");
    return this.verdis_transaction.addReferences({ "object_type": "typee", "object_uuid": "uuidd"},"5b51fbe3-dfe5-4c0f-8637-25e140fdeff1");
  }

  @Get('tryTruckDocValid')
  tryTruckDocValid(@Body() reqdata) {
    // call transaction and pass as first para meter
    return this.frameworkService1.DoNext(reqdata, "initial");
  }

  @Get('tryStoreDocColl')
  tryStoreDocColl(@Body() reqdata) {
    // call transaction and pass as first para meter
    return this.frameworkService2.DoNext(reqdata, "initial");
  }

  @Get('tryDataModel')
  tryDataMpdel() {
    return this.frameworkObjectService.create("putaway", {
      "id": 9134,
      "no": "PUTAWAY/9134",
      "putaway_client": "Disney_Bhiwandi",
      "location_code": "MFC_MUM",
      "document_type": "sale_return",
      "document_no": "DMRTN/00007580",
      "gate_entry_date": "2022-12-31 17:02:42",
      "grndt": "2022-12-31 17:02:42",
      "gate_entry_docno": "100299013-1",
      "gate_entry_document_type": "order",
      "grn_invoice_no": "",
      "grn_invoice_date": "",
      "putaway_type": "ok",
      "total_putaway_quantity": 2,
      "total_invoice_quantity": 2,
      "status": 0,
      "created_by": "Akshay Sakpal t",
      "modified_by": "",
      "created_at": "2022-12-31 17:03:53",
      "updated_at": "2022-12-31 17:03:53",
      "putaway_item": [{
          "putaway_detail_id": 9134,
          "item_no": "9278P",
          "item_id": 38531,
          "description": "Disney Cinderella Topaz Princess Gift Set-Steel Mug with Bowl",
          "bin_code": "MFC-FR25-04B",
          "quantity": 1,
          "qc_status": "ok",
          "box_no": "",
          "lot_no": "",
          "season_code": "",
          "brand_code": "SKI",
          "pet_style_code": "Default",
          "color_code": "",
          "size_code": "",
          "category_code": "Back_To_School",
          "uom_id": 1,
          "code": "PCS"
      }]
    });
  }
}


// {
//   "id": 9134,
//   "no": "PUTAWAY/9134",
//   "putaway_client": "Disney_Bhiwandi",
//   "location_code": "MFC_MUM",
//   "document_type": "sale_return",
//   "document_no": "DMRTN/00007580",
//   "gate_entry_date": "2022-12-31 17:02:42",
//   "grndt": "2022-12-31 17:02:42",
//   "gate_entry_docno": "100299013-1",
//   "gate_entry_document_type": "order",
//   "grn_invoice_no": "",
//   "grn_invoice_date": "",
//   "putaway_type": "ok",
//   "total_putaway_quantity": 2,
//   "total_invoice_quantity": 2,
//   "status": 0,
//   "created_by": "Akshay Sakpal t",
//   "modified_by": "",
//   "created_at": "2022-12-31 17:03:53",
//   "updated_at": "2022-12-31 17:03:53",
//   "putaway_item": [{
//       "putaway_detail_id": 9134,
//       "item_no": "9278P",
//       "item_id": 38531,
//       "description": "Disney Cinderella Topaz Princess Gift Set-Steel Mug with Bowl",
//       "bin_code": "MFC-FR25-04B",
//       "quantity": 1,
//       "qc_status": "ok",
//       "box_no": "",
//       "lot_no": "",
//       "season_code": "",
//       "brand_code": "SKI",
//       "pet_style_code": "Default",
//       "color_code": "",
//       "size_code": "",
//       "category_code": "Back_To_School",
//       "uom_id": 1,
//       "code": "PCS"
//   }]
// }

