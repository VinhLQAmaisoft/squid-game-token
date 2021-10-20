const {
    createLogger,
    transports,
    format
} = require('winston')
require('winston-mongodb')
const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: 'error',
            db: `mongodb+srv://Vinh2611:He140293@cluster0.6og83.mongodb.net/squid-game-token?retryWrites=true&w=majority`,
            options: { useUnifiedTopology: true },
            collection: 'logger_error',
            format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json())
        }),
    ]
})
module.exports = logger