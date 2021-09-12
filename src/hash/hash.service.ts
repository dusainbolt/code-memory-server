import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class HashService {
  private secret;
  constructor(private configService: ConfigService) {
    this.secret = this.configService.get('JWT_SECRET');
  }

  hashCryptoAES(data: object | string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.configService.get('APP_KEY')).toString();
  }

  unHashCryptoAES(hash: string): any {
    const bytes = CryptoJS.AES.decrypt(hash, this.configService.get('APP_KEY'));
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  hashMD5Crypto(message: string): string {
    return CryptoJS.MD5(message).toString();
  }

  async hashBcrypt(message: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(message, salt);
  }

  async matchBcrypt(message, hash): Promise<boolean> {
    return await bcrypt.compare(message, hash);
  }

  signJWT(data: any): string {
    return jwt.sign(data, this.secret);
  }

  verifyJWT(token: string) {
    return jwt.verify(token, this.secret);
  }
}
