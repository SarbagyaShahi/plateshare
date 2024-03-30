import { AppDataStore } from '../data-source';
import { User } from '../entity/user.entity';

export const userRepo=AppDataStore.getRepository(User)
