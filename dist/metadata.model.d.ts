import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
export interface MetaDataModel extends InMemoryDBEntity {
    id: string;
    title: string;
    link: string;
    description: string;
    time_added: Number;
    largest_image: {
        src: string;
        base64: string;
        dimension: {
            height: number;
            width: number;
            orientation: number;
            type: number;
        };
    };
}
