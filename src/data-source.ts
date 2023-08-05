import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432, // Default PostgreSQL port
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Auto-create database tables based on entity definitions (only for development, not for production)
    logging: false, // Disable query logging (change to true for debugging)
    entities: [User], // Array of entity classes
    migrations: [], // Array of migration files if you have any
    subscribers: [], // Array of subscriber classes if you have any 
})
