import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export class HomeModule { }

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
