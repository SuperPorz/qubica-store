import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ErrorModalComponent } from './shared/components/error-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ErrorModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
