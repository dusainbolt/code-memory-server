import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { config } from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: S3;
  private Bucket: string = "";
  constructor(private configService: ConfigService) {
    // config.update({
    // })


    this.s3 = new S3({
      region: 'ap-southeast-1',
      accessKeyId: 'AKIAUYZ7AQ5QCIWOGNWC',
      secretAccessKey: '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',
    })
    this.Bucket = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
  }

  async renameObject() {
    // return await this.s3.upload({
    //   Bucket: this.Bucket,
    //   Key: "12312321",
    //   Body: "12321321321"
    // }, function (err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else console.log(data);
    // }
    // );
    return await this.s3.copyObject({
      Bucket: this.Bucket,
      CopySource: `${this.Bucket}/meta/favicon-ico-1630597799923.png`,
      Key: `tag/test-copy.png`,
      ACL: 'public-read',
    }, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);
    });
  }
}
