import {ApiProperty} from "@nestjs/swagger";

export class FavoriteSuperheroDto {

    @ApiProperty({example: '2', description: 'Unique user`s ID'})
    readonly user_id: string;

    @ApiProperty({example: '1', description: 'Unique superhero`s ID'})
    readonly superhero_id: string;
}