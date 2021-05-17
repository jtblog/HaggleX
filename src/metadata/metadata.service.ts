import { Injectable, HttpException } from '@nestjs/common';
import { metadatas } from '../mocks/metadata.mock';

@Injectable()
export class MetadataService {
    metadatas = metadatas;

    getMetadatas(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.metadatas);
        });
    }

    getMetadata(id): Promise<any> {
        //let id = Number(id); convert id to number
        return new Promise(resolve => {
            const url = this.metadatas.find(metadata => metadata.id === id);
            if (!url) {
                throw new HttpException('Does not exist!', 404);
            }
            resolve(url);
        });
    }

    getMetadataByLink(link): Promise<any> {
        return new Promise(resolve => {
            const url = this.metadatas.find(metadata => metadata.link == link);
            if (!url) {
                throw new HttpException('Does not exist!', 404);
            }
            resolve(url);
        });
    }
}