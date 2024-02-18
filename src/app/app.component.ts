import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsDataService } from './steps/steps-data.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isStepTwoActive: boolean = false;
  isStepThreeActive: boolean = false;

  constructor(private stepsDataService: StepsDataService) {}

  ngOnInit(): void {
    // Check that step 1 has been done
    this.stepsDataService.isStepOneDataDefault().subscribe((isDefault) => {
      this.isStepTwoActive = !isDefault;
    });

    // Check that step 1 & 2 have been done
    combineLatest([
      this.stepsDataService.isStepOneDataDefault(),
      this.stepsDataService.isStepTwoDataDefault(),
    ])
      .pipe(
        map(
          ([isStepOneDefault, isStepTwoDefault]) =>
            !isStepOneDefault && !isStepTwoDefault
        )
      )
      .subscribe((isActive) => {
        this.isStepThreeActive = isActive;
      });
  }
}
