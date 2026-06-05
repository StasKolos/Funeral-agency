import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
    private readonly publicBaseUrl: string;

    readonly bucket: string;
    readonly client: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.bucket = this.configService.getOrThrow<string>('S3_BUCKET');
        this.publicBaseUrl = this.configService
            .getOrThrow<string>('S3_PUBLIC_BASE_URL')
            .replace(/\/$/, '');

        this.client = new S3Client({
            endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
            region: this.configService.getOrThrow<string>('S3_REGION'),
            forcePathStyle: true,
            credentials: {
                accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY'),
                secretAccessKey: this.configService.getOrThrow<string>('S3_SECRET_KEY'),
            },
        });
    }

    getPublicUrl(key: string) {
        return `${this.publicBaseUrl}/${key}`;
    }
}
