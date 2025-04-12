import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss'],
    standalone: false,
})
export class LayoutComponent {
    isCropPage = false;
    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.isCropPage = event.url.includes('/article/crop');
            });
    }
}