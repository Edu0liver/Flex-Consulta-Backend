import * as fs from 'node:fs';
import { resolve } from 'node:path';
import { IStorageProvider } from '../IStorageProvider';
import { uploadConfig } from 'src/shared/config/uploadFiles';

export class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(uploadConfig.tmpFolder, file),
            resolve(`${uploadConfig.tmpFolder}/${folder}`, file),
        );

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${uploadConfig.tmpFolder}/${folder}`, file);

        try {
            await fs.promises.stat(filename);
        } catch {
            return;
        }

        await fs.promises.unlink(filename);
    }
}
