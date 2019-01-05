import { SlideType } from './slide-type';

export class Slide implements ISlide {
    SlideId: string;
    Header: string;
    SlideType: SlideType;
}

export interface ISlide {
    SlideId: string;
    Header: string;
    SlideType: SlideType;
}