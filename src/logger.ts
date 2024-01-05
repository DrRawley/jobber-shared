import winston, { Logger } from 'winston';
import { ElasticsearchTransformer, ElasticsearchTransport, LogData, TransformedData } from 'winston-elasticsearch';

const esTrasformer = (logData: LogData): TransformedData => {
    return ElasticsearchTransformer(logData);
}

//Need to pass the URL for the elastic search node here.
//Name is the source of the log entry
//Level is the level of log defined in winston according to RFC5424
export const winstonLogger = (elasticsearchNode: string, name: string, level: string): Logger => {
    //Defines options for local console logging, and/or logging to elastic search
    const options = {
        console: {
            level,
            handleExceptions: true,
            json: false,
            colorize: true
        },
        elasticsearch: {
            level,
            transformer: esTrasformer,
            clientOpts: {
                node: elasticsearchNode,
                log: level,
                maxRetries: 2,
                requestTimeout: 10000,
                sniffOnStart: false
            }
        }
    }
    //Create logger using the above
    const esTransport: ElasticsearchTransport = new ElasticsearchTransport(options.elasticsearch);
    const logger: Logger = winston.createLogger({
        exitOnError: false,
        defaultMeta: { service: name },
        transports: [new winston.transports.Console(options.console), esTransport]
    });
    return logger;
}