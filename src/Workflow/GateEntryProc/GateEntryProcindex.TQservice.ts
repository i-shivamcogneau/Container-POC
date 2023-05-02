// From Compiler

import { FrameworkService } from "./TaskQueueFramework";
import { TruckatGateProducerService } from "./GateEntryProc.producer";
import { DocToDoProducerService } from "./GateEntryProc.producer";
import { NowParkProducerService } from "./GateEntryProc.producer";
import { TruckDocCollConsumer } from "./GateEntryProc.consumer";
import { DocVeriConsumer } from "./GateEntryProc.consumer";
import { AllotParkSlotConsumer } from "./GateEntryProc.consumer";

export const GateEntryProcTaskQueuesServices = [FrameworkService, TruckatGateProducerService , DocToDoProducerService , NowParkProducerService , TruckDocCollConsumer , DocVeriConsumer , AllotParkSlotConsumer ];