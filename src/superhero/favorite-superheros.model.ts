import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Superhero} from "../superhero/superhero.model";
import {User} from "../users/user.model";


@Table({tableName:'favorite_heroes', createdAt: false, updatedAt: false})
export class FavoriteSuperheros extends Model<FavoriteSuperheros>{

    @ApiProperty({example:1, description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=> User)
    @ApiProperty({example:2, description: 'Unique user`s identifier'})
    @Column({type: DataType.INTEGER})
    id_user: number;

    @ForeignKey(()=> Superhero)
    @ApiProperty({example:3, description: 'Unique hero`s identifier'})
    @Column({type: DataType.INTEGER})
    id_hero: number;

}