import {ApiProperty} from "@nestjs/swagger";

export class UpdateSuperheroDto {

    @ApiProperty({example: 'Superman', description: 'Unique superhero`s'})
    readonly id: number;

    @ApiProperty({example: 'Superman', description: 'Unique superhero`s'})
    readonly nickname: string;

    @ApiProperty({example: 'Clark Kent', description: 'Real name'})
    readonly real_name: string;

    @ApiProperty({example: 'He was born Kal-El on the planet Krypton, before being rocketed to\n' +
            'Earth as an infant by his scientist father Jor-El, moments before Krypton\'s destruction…', description: 'Description'})
    readonly origin_description: string;

    @ApiProperty({example: 'Solar energy absorption and healing factor, solar flare and heat vision,\n' +
            'solar invulnerability, flight…', description: 'Superpowers'})
    readonly superpowers: string;

    @ApiProperty({example: '“Look, up in the sky, it\'s a bird, it\'s a plane, it\'s Superman!”',
        description: 'Catch phrase'})
    readonly catch_phrase: string;

    @ApiProperty({example: 'Files', description: 'Add images'})
    readonly images: string;

    @ApiProperty({example: '01.jpg;02.jpg', description: 'Names of images what must be remove, separated by ";"'})
    readonly remove_images: string;

    @ApiProperty({example: '01.jpg', description: 'Main image of superhero'})
    readonly main_image: string;

    @ApiProperty({example: 11, description: 'User`s who created ID'})
    readonly author_id: string;
}