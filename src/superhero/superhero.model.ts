import {BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {FavoriteSuperheros} from "./favorite-superheros.model";


interface SuperheroCreationAttrs {
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    images: string;
    author_id: string;
    main_image: string;
}

@Table({tableName:'superheros'})
export class Superhero extends Model<Superhero, SuperheroCreationAttrs>{

    @ApiProperty({example:1, description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Superman', description: 'Unique superhero`s'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    nickname: string;

    @ApiProperty({example: 'Clark Kent', description: 'Real name'})
    @Column({type: DataType.STRING})
    real_name: string;

    @ApiProperty({example: 'He was born Kal-El on the planet Krypton, before being rocketed to\n' +
            'Earth as an infant by his scientist father Jor-El, moments before Krypton\'s destruction…', description: 'Description'})
    @Column({type: DataType.STRING})
    origin_description: string;

    @ApiProperty({example: 'Solar energy absorption and healing factor, solar flare and heat vision,\n' +
            'solar invulnerability, flight…', description: 'Superpowers'})
    @Column({type: DataType.STRING})
    superpowers: string;

    @ApiProperty({example: '“Look, up in the sky, it\'s a bird, it\'s a plane, it\'s Superman!”',
        description: 'Catch phrase'})
    @Column({type: DataType.STRING})
    catch_phrase: string;

    @ApiProperty({example: '01.jpg;02.jpg', description: 'Names of images, separated by ";"'})
    @Column({type: DataType.STRING})
    images: string;

    @ApiProperty({example: '01.jpg', description: 'Main image of superhero'})
    @Column({type: DataType.STRING})
    main_image: string;

    @ApiProperty({example: 11, description: 'User`s who created ID'})
    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER})
    author_id: number;


    @ApiProperty({description: 'Users who following to superhero'})
    @BelongsToMany(() => User, () => FavoriteSuperheros)
    followers: User[];

    // @ApiProperty({example: 'Sergiy', description: 'User who created superhero in catalog'})
    // @BelongsTo(() => User)
    // created_by: User;

}