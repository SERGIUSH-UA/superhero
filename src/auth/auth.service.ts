import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/user.model";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private readonly jwtService: JwtService) {}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException('User with this email is registered', HttpStatus.BAD_REQUEST);
        }
        const hashPassword: string = await bcrypt.hash(userDto.password, 4);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, username: user.username};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateToken(token: string){
        try {
            return this.jwtService.verify(token);
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
        }

    }

     private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if(!user){
            throw new UnauthorizedException({message: 'Invalid login or password!'});
        }
        const comparePass = await bcrypt.compare(userDto.password, user.password);

        if(user && comparePass){
            return user;
        }
        throw new UnauthorizedException({message: 'Invalid login or password!'});
    }

    async checkAuth(token: string) {
        const payload = await this.validateToken(token);
        const user = await this.userService.getUserByEmail(payload.email);
        return user;
    }
}
