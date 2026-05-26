import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3Client({
            forcePathStyle: true,
            region: this.configService.getOrThrow<string>('s3.region'),
            endpoint: this.configService.getOrThrow<string>('s3.endpoint'),
            credentials: {
                accessKeyId: this.configService.getOrThrow<string>('s3.accessKeyId'),
                secretAccessKey: this.configService.getOrThrow<string>('s3.secretAccessKey'),
            },
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const command = new PutObjectCommand({
            Bucket: this.configService.getOrThrow<string>('s3.bucketName'),
            Key: file.originalname,
            Body: file.buffer,
        });

        await this.s3Client.send(command);
    }

    get client(): S3Client {
        return this.s3Client;
    }
}
