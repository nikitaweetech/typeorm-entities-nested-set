import { AppModule } from "./src/app/app.module";
import {NestFactory} from '@nestjs/core';
import { DocumentBuilder,SwaggerModule  } from '@nestjs/swagger';

async function bootstrap(){
    const app=await NestFactory.create(AppModule)
     const config = new DocumentBuilder()
    .setTitle('My API') 
    .setDescription('API documentation for my project') 
    .setVersion('1.0') 
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs-nested-setup', app, document);
    await app.listen(process.env.PORT || 3000,()=>{
        console.log('App is running on port',process.env.PORT || 3000)
    })
}
bootstrap();