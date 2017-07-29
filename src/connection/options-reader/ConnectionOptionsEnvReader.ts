import {ConnectionOptions} from "../ConnectionOptions";
import {PlatformTools} from "../../platform/PlatformTools";
import {OrmUtils} from "../../util/OrmUtils";

/**
 * Reads connection options from environment variables.
 * Environment variables can have only a single connection.
 * Its strongly required to define TYPEORM_CONNECTION env variable.
 */
export class ConnectionOptionsEnvReader {

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Reads connection options from environment variables.
     */
    read(): ConnectionOptions {
        return {
            type: PlatformTools.getEnvVariable("TYPEORM_CONNECTION"),
            url: PlatformTools.getEnvVariable("TYPEORM_URL"),
            host: PlatformTools.getEnvVariable("TYPEORM_HOST"),
            port: PlatformTools.getEnvVariable("TYPEORM_PORT"),
            username: PlatformTools.getEnvVariable("TYPEORM_USERNAME"),
            password: PlatformTools.getEnvVariable("TYPEORM_PASSWORD"),
            database: PlatformTools.getEnvVariable("TYPEORM_DATABASE"),
            sid: PlatformTools.getEnvVariable("TYPEORM_SID"),
            schema: PlatformTools.getEnvVariable("TYPEORM_SCHEMA"),
            extra: PlatformTools.getEnvVariable("TYPEORM_DRIVER_EXTRA") ? JSON.parse(PlatformTools.getEnvVariable("TYPEORM_DRIVER_EXTRA")) : undefined,
            synchronize: OrmUtils.toBoolean(PlatformTools.getEnvVariable("TYPEORM_SYNCHRONIZE")),
            migrationsRun: OrmUtils.toBoolean(PlatformTools.getEnvVariable("TYPEORM_MIGRATIONS_RUN")),
            entities: this.stringToArray(PlatformTools.getEnvVariable("TYPEORM_ENTITIES")),
            migrations: this.stringToArray(PlatformTools.getEnvVariable("TYPEORM_MIGRATIONS")),
            subscribers: this.stringToArray(PlatformTools.getEnvVariable("TYPEORM_SUBSCRIBERS")),
            entitySchemas: this.stringToArray(PlatformTools.getEnvVariable("TYPEORM_ENTITY_SCHEMAS")),
            logging: this.transformLogging(PlatformTools.getEnvVariable("TYPEORM_LOGGING")),
            logger: PlatformTools.getEnvVariable("TYPEORM_LOGGER"),
            entityPrefix: PlatformTools.getEnvVariable("TYPEORM_ENTITY_PREFIX"),
            maxQueryExecutionTime: PlatformTools.getEnvVariable("TYPEORM_MAX_QUERY_EXECUTION_TIME"),
            cli: {
                entitiesDir: PlatformTools.getEnvVariable("TYPEORM_ENTITIES_DIR"),
                migrationsDir: PlatformTools.getEnvVariable("TYPEORM_MIGRATIONS_DIR"),
                subscribersDir: PlatformTools.getEnvVariable("TYPEORM_SUBSCRIBERS_DIR"),
            }
        };
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------

    /**
     * Transforms logging string into real logging value connection requires.
     */
    protected transformLogging(logging: string): any {
        if (logging === "true" || logging === "TRUE" || logging === "1")
            return true;
        if (logging === "all")
            return "all";

        return this.stringToArray(logging);
    }

    /**
     * Converts a string which contains multiple elements split by comma into a string array of strings.
     */
    protected stringToArray(variable?: string) {
        if (!variable)
            return [];
        return variable.split(",").map(str => str.trim());
    }

}
