import { DataSource,  } from 'typeorm';
import * as dotenv from'dotenv';
import * as path from 'path';
import { Item } from '../item/item.entity';
import { Category } from '../category/category.entity';
dotenv.config({ path: path.resolve('.env') });

export default new DataSource({
  type: 'postgres',
         host: process.env.DB_HOST,
         port: process.env.DB_PORT as unknown as number,
         username: process.env.DB_USERNAME,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
         entities:[Item,Category],
         synchronize: true,     
});