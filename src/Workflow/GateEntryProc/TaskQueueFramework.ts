// From Compiler

import { Injectable } from '@nestjs/common';
import { TruckatGateProducerService } from "./GateEntryProc.producer";
import { DocToDoProducerService } from "./GateEntryProc.producer";
import { NowParkProducerService } from "./GateEntryProc.producer";
import { verdis_transaction } from '../../Framework/transactionObj/transaction.framework';

@Injectable()
export class FrameworkService {
	constructor(private TruckatGateProducerService: TruckatGateProducerService,
		private DocToDoProducerService: DocToDoProducerService,
		private NowParkProducerService: NowParkProducerService,
		private readonly verdis_transaction: verdis_transaction) {}
	async DoNext(transacobj, lastTask) {
		if (lastTask == "initial") {

			transacobj = {
				"Transaction_Obj": await this.verdis_transaction.create(),
				"data": transacobj
			}

		}
		const QueueMap = {
			"initial": () => this.TruckatGateProducerService.sendJsonObj(transacobj),
			"TruckDocColl": () => this.DocToDoProducerService.sendJsonObj(transacobj),
			"DocVeri": () => this.NowParkProducerService.sendJsonObj(transacobj)
		};
		if (lastTask in QueueMap)
			return await QueueMap[lastTask]();

		return "task not present";
	}
}