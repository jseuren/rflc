import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FundraisingSlide } from 'src/app/models/fundraising/fundraising-slide';
import { HttpClient } from '@angular/common/http';
import { Fundraising } from 'src/app/models/fundraising/fundraising';

@Component({
  selector: 'slide-fundraising',
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css']
})
export class FundraisingComponent implements OnChanges {

  @Input() model: FundraisingSlide;
  @Input() isActiveSlide: boolean;
  teamFundraising: Array<Fundraising>;
  constructor(private _http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    
    if(activeSlide) {
      if (activeSlide.currentValue === true) {

        this.getTeamFundraising().then(result => {
          this.teamFundraising = result;
        });

      } else {
        this.teamFundraising = [];
      }
    }
    
  }

  async getTeamFundraising(): Promise<Array<Fundraising>> {
    const teamFundraising = await this._http.get<Array<Fundraising>>('https://rflapp.azurewebsites.net/fundraising.php').toPromise();
    return teamFundraising;
  }

}
