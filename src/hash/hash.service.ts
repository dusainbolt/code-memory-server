import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class HashService {
    constructor(private configService: ConfigService) {}

    hashCryptoAES(data: object | string): string {
        return CryptoJS.AES.encrypt(JSON.stringify(data), this.configService.get('API_KEY')).toString();
    }

    unHashCryptoAES(hash: string): any {
        const bytes = CryptoJS.AES.decrypt(hash, this.configService.get('API_KEY'));
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    hashMD5Crypto(message: string): string {
        return CryptoJS.MD5(message).toString();
    }
}
