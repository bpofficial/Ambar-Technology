import * as bodyParser from "body-parser"; 
import * as express from "express";
import * as path from "path";
import * as pino from "express-pino-logger";
import * as cors from "cors";
import * as helmet from "helmet";

/**
 * Intialise App & Middleware
 */
const app = express(); 
app.use( helmet() );
app.use( cors() );
app.use( pino() ); 
app.use( bodyParser.json() ); 
app.use( express.static ( path.resolve( __dirname + "dist" ) ) );

export default app;