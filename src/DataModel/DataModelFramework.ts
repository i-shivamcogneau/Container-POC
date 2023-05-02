// From Compiler

import { Injectable } from '@nestjs/common';
import { Store_DetailsService } from "./Store_Details.service";
import { Truck_DocumentService } from "./Truck_Document.service";
import { Gate_EntryService } from "./Gate_Entry.service";

@Injectable()
export class FrameworkObjectService {
    constructor(private Store_DetailsService: Store_DetailsService, private Truck_DocumentService: Truck_DocumentService, private Gate_EntryService: Gate_EntryService) {}
    create(objName, data = {}) {
        const ObjManipMap = {
            "Store_Details": () => this.Store_DetailsService.PostObj(data),
            "Truck_Document": () => this.Truck_DocumentService.PostObj(data),
            "Gate_Entry": () => this.Gate_EntryService.PostObj(data)
        };
        return ObjManipMap[objName]();
    }
    get(objName, data = {}) {
        var tmp = data;
        data ={};
        data["filter"] = tmp;  // new added
        const ObjManipMap = {
            "Store_Details": () => this.Store_DetailsService.GetObj(data),
            "Truck_Document": () => this.Truck_DocumentService.GetObj(data),
            "Gate_Entry": () => this.Gate_EntryService.GetObj(data)
        };
        return ObjManipMap[objName]();
    }
    put(objName, data = {}) {
        var tmp = data;
        data ={};
        data["filter"] = tmp;  // new added
        const ObjManipMap = {
            "Store_Details": () => this.Store_DetailsService.PutObj(data),
            "Truck_Document": () => this.Truck_DocumentService.PutObj(data),
            "Gate_Entry": () => this.Gate_EntryService.PutObj(data)
        };
        return ObjManipMap[objName]();
    }
    delete(objName, data = {}) {
        var tmp = data;
        data ={};
        data["filter"] = tmp;  // new added
        const ObjManipMap = {
            "Store_Details": () => this.Store_DetailsService.DeleteObj(data),
            "Truck_Document": () => this.Truck_DocumentService.DeleteObj(data),
            "Gate_Entry": () => this.Gate_EntryService.DeleteObj(data)
        };
        return ObjManipMap[objName]();
    }
}