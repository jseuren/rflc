import { SlideType } from './slide-type';

export class Slide implements ISlide {
    SlideId: string;
    Header: string;
    SlideType: SlideType;
    SecondsToForceShowFor: number;
    ForceSlideToShowAtTime: string;
}

export interface ISlide {
    SlideId: string;
    Header: string;
    SlideType: SlideType;
    SecondsToForceShowFor: number;
    ForceSlideToShowAtTime: string;
}