import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'test@gmail.com', description: 'Unique user`s email'})
    readonly email: string;

    @ApiProperty({example: '13651365', description: 'Password'})
    readonly password: string;

    @ApiProperty({example: 'Serg', description: 'User`s name'})
    readonly username: string;
}