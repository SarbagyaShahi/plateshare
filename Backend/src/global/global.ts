import { global_settings } from "../bootstrap/config";
import { HttpLogger } from "../utils/logger.util";




export const logger=new HttpLogger(global_settings.log.httpLog,
  global_settings.log.errorLog,
  global_settings.log.emailLog,
  global_settings.log.smsLog,
  global_settings.log.smsErrorLog,
  global_settings.log.directory
  )