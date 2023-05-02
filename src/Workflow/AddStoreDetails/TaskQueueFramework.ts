// From Compiler

import { Injectable } from '@nestjs/common';
import { ToAddStoreProducerService } from "./AddStoreDetails.producer";
import { verdis_transaction } from '../../Framework/transactionObj/transaction.framework';

@Injectable()
export class FrameworkService {
	constructor(private ToAddStoreProducerService: ToAddStoreProducerService,
		private readonly verdis_transaction: verdis_transaction) {}
	async DoNext(transacobj, lastTask) {
		if (lastTask == "initial") {

			transacobj = {
				"Transaction_Obj": await this.verdis_transaction.create(),
				"data": transacobj
			}

		}
		const QueueMap = {
			"initial": () => this.ToAddStoreProducerService.sendJsonObj(transacobj),
		};
		if (lastTask in QueueMap)
			return await QueueMap[lastTask]();

		return "task not present";
	}
}