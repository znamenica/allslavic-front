import ConfigObject from "../../Config.json";

export interface IConfig {
    CIRCLE_API: string;
}

export default class Config {
    static CIRCLE_API: string;

    static init() {
        return Promise.resolve(ConfigObject);
    }

    static set(config: any) {
        this.CIRCLE_API = config.CIRCLE_API;
    }

    static get(): IConfig {
        return {
            CIRCLE_API: this.CIRCLE_API,
        };
    }

}