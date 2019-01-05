import { SlideType } from './slide-type';

export class Slide implements ISlide {
    SlideId: string;
    Header: string;
    SlideType: SlideType;
    SecondsToForceShowFor: number;
    ForceSlideToShowAtTime: string;
    ShowForSeconds: number;
}

export interface ISlide {
    SlideId: string;
    Header: string;
    SlideType: SlideType;
    SecondsToForceShowFor: number;
    ForceSlideToShowAtTime: string;
    ShowForSeconds: number;
}