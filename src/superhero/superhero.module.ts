import { Module } from '@nestjs/common';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Superhero} from "./superhero.model";
import {FavoriteSuperheros} from "./favorite-superheros.model";
import {User} from "../users/user.model";
import {FilesModule} from "../files/files.module";
import {UsersService} from "../users/users.service";

@Module({
  controllers: [SuperheroController],
  providers: [SuperheroService, UsersService],
  imports: [
      SequelizeModule.forFeature([Superhero, FavoriteSuperheros, User]),
      FilesModule
  ]
})
export class SuperheroModule {}
