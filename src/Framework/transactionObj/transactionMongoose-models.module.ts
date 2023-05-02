import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Transaction_MODEL, TransactionSchema } from "src/Framework/transactionObj/transaction.schema";

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction_MODEL, schema: TransactionSchema}])],
  exports: [MongooseModule],
})
export class TransactionMongooseModelsModule {}