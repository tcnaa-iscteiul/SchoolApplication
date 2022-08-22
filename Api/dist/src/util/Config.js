"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = {
    API_URL: process.env.NODE_ENV === "development" ? "http://localhost:3333/" : "https://school-application2.vercel.app/",
    TIMEOUT_REQUEST: 5000,
    HEADER_REQUEST: {
        Accept: 'application/json'
    }
};
exports.default = Config;
//# sourceMappingURL=Config.js.map