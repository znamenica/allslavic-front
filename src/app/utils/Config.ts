export interface IConfig {
    CIRCLE_API: string;
}

export default class Config {
    static CIRCLE_API: string;

    static async init() {
        const res = await window.fetch("/Config.json");
        return res.json();
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