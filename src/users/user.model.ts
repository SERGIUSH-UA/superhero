import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Superhero} from "../superhero/superhero.model";
import {FavoriteSuperheros} from "../superhero/favorite-superheros.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example:1, description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@gmail.com', description: 'Unique user`s email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'Sergiy', description: 'User`s name'})
    @Column({type: DataType.STRING})
    username: string;

    @ApiProperty({example: '13651365', description: 'Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({description: 'Created by user superheros'})
    @HasMany(() => Superhero, 'author_id')
    created_superheros: Superhero[];

    @ApiProperty({description: 'User`s favorite superheros'})
    @BelongsToMany(() => Superhero, () => FavoriteSuperheros)
    favorite_superheros: Superhero[];

}