// From Compiler

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TruckatGateProducerService {
    constructor(@InjectQueue('TruckatGateQueue') private queue: Queue) {}
    async sendJsonObj(transacObj) {
        await this.queue.add('TruckDocCollJob', {
            transacObj
        });
        return 'maybe added to the queue';
    }
}
@Injectable()
export class DocToDoProducerService {
    constructor(@InjectQueue('DocToDoQueue') private queue: Queue) {}
    async sendJsonObj(transacObj) {
        await this.queue.add('DocVeriJob', {
            transacObj
        });
        return 'maybe added to the queue';
    }
}
@Injectable()
export class NowParkProducerService {
    constructor(@InjectQueue('NowParkQueue') private queue: Queue) {}
    async sendJsonObj(transacObj) {
        await this.queue.add('AllotParkSlotJob', {
            transacObj
        });
        return 'maybe added to the queue';
    }
}