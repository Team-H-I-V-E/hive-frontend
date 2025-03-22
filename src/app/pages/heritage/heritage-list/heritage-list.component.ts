import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetHeritagesResponseData } from 'src/app/models/heritage/heritage-getheritage-response-data.interface';
import { HeritageService } from 'src/app/services/heritage/heritage.service';

@Component({
  selector: 'app-heritage-list',
  templateUrl: './heritage-list.component.html',
  styleUrls: ['./heritage-list.component.scss'],
  standalone: false
})
export class HeritageListComponent implements OnInit {
  heritages: GetHeritagesResponseData[] = [];

  constructor(
    private heritageService: HeritageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.heritageService.getHeritages().subscribe(data => {
      this.heritages = data;
    });
  }

  loadHeritages() {
    this.heritageService.getHeritages().subscribe((data) => {
      this.heritages = data;
    });
  }

  goToHeritageDetail(id: number) {
    this.router.navigate([`/heritage/heritagedetail/${id}`]); 
  }
}
