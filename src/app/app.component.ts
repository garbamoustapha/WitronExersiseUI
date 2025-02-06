import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from '../Components/navBarComponent';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [ NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WitronExerciseUI';
}
