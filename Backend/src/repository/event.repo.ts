import { AppDataStore } from "../data-source";
import { event } from "../entity/event.entity";



export const eventRepo = AppDataStore.getRepository(event)