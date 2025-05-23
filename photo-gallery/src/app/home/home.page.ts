import { Component, OnInit } from '@angular/core';
import { VoliService } from '../services/voli.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  voli: any[] = [];

  constructor(private voliService: VoliService) {}

  ngOnInit() {
    this.voliService.getVoli().subscribe((data: any) => {
      this.voli = data;
    });
  }
}
