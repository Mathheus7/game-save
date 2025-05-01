import {DataSource} from "typeorm";
import { Product } from "../entities/Product";


const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'app_db',
    schema: 'public',
    synchronize: true,
    logging: true,
    entities: [
        Product,
    ],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;