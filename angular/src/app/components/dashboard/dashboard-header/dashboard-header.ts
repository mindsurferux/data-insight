import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  imports: [RouterModule],
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.css']
})
export class DashboardHeader {
  isHovered = false;
}
