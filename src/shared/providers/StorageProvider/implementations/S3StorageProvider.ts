import { IStorageProvider } from '../IStorageProvider';
import { S3 } from 'aws-sdk';
import { resolve } from 'path';
import { uploadConfig } from 'src/shared/config/uploadFiles';
import * as fs from 'node:fs';
import mime from 'mime';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(fileName: string, folder: string): Promise<string> {
        const originalName = resolve(uploadConfig.tmpFolder, fileName);
        const fileContent = await fs.promises.readFile(originalName);
        const ContentType = mime.getType(originalName);

        if (!ContentType) {
            throw new Error('File not found');
        }

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: fileName,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(originalName);

        return fileName;
    }

    async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
            })
            .promise();
    }
}

export { S3StorageProvider };
