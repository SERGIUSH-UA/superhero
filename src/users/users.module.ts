import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {FavoriteSuperheros} from "../superhero/favorite-superheros.model";
import {Superhero} from "../superhero/superhero.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Superhero, FavoriteSuperheros])
  ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
