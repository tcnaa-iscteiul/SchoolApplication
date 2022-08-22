"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        console.log(process.env.NODE_ENV);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    });
    app.enableCors({
        allowedHeaders: "*",
        origin: "*"
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen('https://school-application2.vercel.app');
}
bootstrap();
//# sourceMappingURL=main.js.map