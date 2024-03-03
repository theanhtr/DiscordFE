import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import TestService from './service/TestService';
import { TestModel } from './models/TestModel';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DiscordFE';
  protected readonly server: string = environment.API_BASE_URL;
  protected testData: TestModel[] = new Array<TestModel>();

  async ngOnInit() {
    const testService = new TestService();
    this.testData = await testService.getTest();
  }
}
