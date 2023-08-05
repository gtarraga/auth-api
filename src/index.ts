import 'reflect-metadata'
import * as cors from "cors"
import * as express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes/index"
// dotenv to handle environment variables like db credentials
require('dotenv').config()


AppDataSource.initialize().then(async () => {
    // create express app
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    
    app.use('/', routes)

    // start express server
    app.listen(3000, () => {
        console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results")
    })

}).catch(error => console.log(error))
