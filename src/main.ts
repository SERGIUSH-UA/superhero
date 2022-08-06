import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

require('dotenv').config();
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";


async function start() {
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().
        setTitle('Test task for JS Ninjas').
        setDescription('Catalog of accounting of superheroes. Rest API documentation')
        .setVersion('1.0.0')
        .addTag('REST API v1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })

}

start()