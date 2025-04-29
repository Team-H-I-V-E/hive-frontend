import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe(() => {
      const offcanvasEl = document.getElementById('mobileMenu');
      if (offcanvasEl && offcanvasEl.classList.contains('show')) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      }
    });
  }
}