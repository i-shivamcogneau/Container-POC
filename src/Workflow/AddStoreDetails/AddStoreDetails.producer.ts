// From Compiler

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ToAddStoreProducerService {
    constructor(@InjectQueue('ToAddStoreQueue') private queue: Queue) {}
    async sendJsonObj(transacObj) {
    await this.queue.add('AddingStoreDetailsJob', { transacObj });
    return 'maybe added to the queue';}
}
