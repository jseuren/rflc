import { Slide } from '../slide';

export class CountdownClockSlide extends Slide  implements ICountdownClockSlide{
    EndTime: Date;

}

export interface ICountdownClockSlide  {
    EndTime: Date;
}