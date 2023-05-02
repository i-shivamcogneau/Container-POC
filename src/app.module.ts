import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModelsModule } from './DataModel/schemas/mongoose-models.module';
import { TransactionService } from './Framework/transactionObj/transaction.service';
import { TransactionMongooseModelsModule } from './Framework/transactionObj/transactionMongoose-models.module';
import { verdis_transaction } from './Framework/transactionObj/transaction.framework';
import { ObjServices } from './DataModel/index.services';


// Workflow stuff
import { BullModule } from '@nestjs/bull';
import { MainQueuesIdx } from './Workflow/MainWorkFlowqueues';
import { MainTaskQueuesServices } from './Workflow/MainTaskQueueindex';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost:27017/transactions`), 
  TransactionMongooseModelsModule,
    MongooseModelsModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      }
    }),
    BullModule.registerQueue(...MainQueuesIdx)
  ],
  controllers: [AppController],
  providers: [AppService, TransactionService, verdis_transaction, ...ObjServices, ...MainTaskQueuesServices],
})
export class AppModule {}
