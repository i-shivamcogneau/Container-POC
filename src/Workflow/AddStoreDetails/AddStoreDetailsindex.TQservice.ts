// From Compiler

import { FrameworkService } from "./TaskQueueFramework";
import { ToAddStoreProducerService } from "./AddStoreDetails.producer";
import { AddingStoreDetailsConsumer } from "./AddStoreDetails.consumer";


export const AddStoreDetailsTaskQueuesServices = [FrameworkService, ToAddStoreProducerService, AddingStoreDetailsConsumer ];