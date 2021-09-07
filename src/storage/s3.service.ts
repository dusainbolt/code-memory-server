import { ENV_STORAGE } from './../common/contant';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
@Injectable()
export class S3Service {
  private s3: S3;
  private Bucket: string = "";
  private envFolder: string = "";
  public s3Url: string = "";
  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get('AWS_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    })
    this.Bucket = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
    this.envFolder = ENV_STORAGE[this.configService.get('NODE_ENV')] || ENV_STORAGE.local;
    this.s3Url = `https://${this.Bucket}.s3.${this.s3.config.region}.amazonaws.com`;
  }

  getFileNameByENV(fileName: string): string {
    return `${this.envFolder}/${fileName}.webp`;
  }

  getS3UrlFolderENV = () => {
    return `${this.s3Url}/${this.envFolder}`;
  }

  async copyObject(fullUrl: string, nameFile: string = "", storage = ""): Promise<string> {
    console.log(fullUrl, nameFile);
    if (fullUrl.indexOf(this.getS3UrlFolderENV()) === -1) {
      return fullUrl;
    };
    nameFile = this.getFileNameByENV(`${storage}/${nameFile}`);
    await new Promise((resolve, reject) => {
      this.s3.copyObject({
        Bucket: this.Bucket,
        CopySource: fullUrl,
        Key: nameFile,
        ACL: "public-read"
      }, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          reject(err)
        } else resolve(data);
      });

    });
    return `${this.s3Url}/${nameFile}`;
  }
}
