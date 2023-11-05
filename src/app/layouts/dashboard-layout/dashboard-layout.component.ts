import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})  
export class DashboardLayoutComponent{
  constructor(
    private router: Router,
  ) { }


  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {

  }
}
