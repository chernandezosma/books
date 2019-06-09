/**
 * Development configuration for Mongo.
 *
 * @version Jun 2019
 */

import dotEnv from 'dotenv'

const devConfig = dotEnv.config().parsed
const config = {
  host: devConfig.MONGO_URL,
  port: devConfig.MONGO_PORT,
  database: devConfig.MONGO_DATABASE,
  options: {
    bufferCommands: false,
    autoIndex: true,                    // Don't build indexes
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    poolSize: 10,                       // Maintain up to 10 socket connections
    bufferMaxEntries: 0,                // If not connected, return errors immediately rather than waiting for reconnect
    connectTimeoutMS: 10000,            // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000,             // Close sockets after 45 seconds of inactivity
    keepAlive: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,   // Never stop trying to reconnect
    reconnectInterval: 500,             // Reconnect every 500ms
    family: 4,                          // Just IPv4
    auth: {
      username: devConfig.MONGO_USER,
      password: devConfig.MONGO_PASSWORD,
    },
  },
}

export default config
