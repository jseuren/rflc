import { Track } from './track';

export class Paging {
    href: string;
    items: Track[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}