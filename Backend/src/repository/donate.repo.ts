import { AppDataStore } from "../data-source";

import { donate } from '../entity/donate.entity';


export const donateRepo = AppDataStore.getRepository(donate)