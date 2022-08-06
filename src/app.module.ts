import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { SuperheroModule } from './superhero/superhero.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {User} from "./users/user.model";
import {Superhero} from "./superhero/superhero.model";
import {FavoriteSuperheros} from "./superhero/favorite-superheros.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database:  process.env.DB_NAME,
            models: [User, Superhero, FavoriteSuperheros],
            autoLoadModels: true
        }),
        UsersModule,
        SuperheroModule,
        AuthModule,
        FilesModule
    ],
})
export class AppModule {
    constructor(private configService: ConfigService) {}
}