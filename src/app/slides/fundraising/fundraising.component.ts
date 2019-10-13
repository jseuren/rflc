import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FundraisingSlide } from 'src/app/models/fundraising/fundraising-slide';
import { SAPService } from 'src/app/services/sapService';
import { Fundraising } from 'src/app/models/SAP Hana/sapcommon';

@Component({
  selector: 'slide-fundraising',
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css'],
  providers: [SAPService]
})
export class FundraisingComponent implements OnChanges {

  @Input() model: FundraisingSlide;
  @Input() isActiveSlide: boolean;
  teamFundraising: Fundraising;
  constructor(private sapService:SAPService) { }

  ngOnChanges(changes: SimpleChanges) {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    
    if(activeSlide) {
      if (activeSlide.currentValue === true) {

        this.getTeamFundraising().then(result => {
          this.teamFundraising = result;
        });

      } else {
        this.teamFundraising = new Fundraising();
      }
    }
    
  }

  async getTeamFundraising(): Promise<Fundraising> {
    return this.sapService.getTeamFundraising();
  }

}
