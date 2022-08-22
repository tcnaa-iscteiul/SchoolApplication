import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    });

    app.enableCors({
        allowedHeaders: "*",
        origin: "*"
    });

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT || 3000, function () {
        console.log('CORS-enabled web server listening on port 80')
    });
}
bootstrap();
