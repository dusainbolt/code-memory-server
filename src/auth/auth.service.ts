import { UserService } from '../models/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { User, UserHashToken } from 'src/dto/user/UserDTO';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private hashService: HashService) {}

  async validateUser(id: string): Promise<any> {
    return await this.userService.userModel.findById(id);
    // Feature to do handle with check password
  }

  async validateToken(auth: string) {
    if (auth?.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException();
    }
    const token = auth.split(' ')[1];
    try {
      const userHashToken = this.hashService.verifyJWT(token) as UserHashToken;
      const user: User = await this.validateUser(userHashToken.id);
      if (!!!user.id) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
