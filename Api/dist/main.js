"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const allowCors = fn => async (req, res) => {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
        return await fn(req, res);
    };
    const handler = (req, res) => {
        const d = new Date();
        res.end(d.toString());
    };
    module.exports = allowCors(handler);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT || 3000, function () {
        console.log('CORS-enabled web server listening on port 80');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map