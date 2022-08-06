import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
    controllers:[AuthController],
    imports:[
        UsersModule,
        // JwtModule.register({
        //     secret: process.env.SECRET_KEY || 'SECRET',
        //     signOptions: {
        //         expiresIn: '24h'
        //     }
        // }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRET_KEY') || 'SECRET',
                signOptions: {
                    expiresIn: '24h',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService]
})
export class AuthModule {
}
