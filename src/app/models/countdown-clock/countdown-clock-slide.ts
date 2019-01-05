import { Slide } from '../slide';

export class CountdownClockSlide extends Slide  implements ICountdownClockSlide{
    CountdownEndTime: Date;

}

export interface ICountdownClockSlide  {
    CountdownEndTime: Date;
}