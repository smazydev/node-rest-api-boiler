import logger from 'pino';
import moment from 'moment';

const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":${moment().format("MMMM Do, h:mm:ss a")}`
})

export default log