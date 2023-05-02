// From Compiler

import { AddStoreDetailsTaskQueuesServices } from './AddStoreDetails/AddStoreDetailsindex.TQservice'
import { GateEntryProcTaskQueuesServices } from './GateEntryProc/GateEntryProcindex.TQservice'

export const MainTaskQueuesServices = [
	...AddStoreDetailsTaskQueuesServices, ...GateEntryProcTaskQueuesServices
]