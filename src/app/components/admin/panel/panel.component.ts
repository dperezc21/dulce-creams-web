import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-panel',
  imports: [
    RouterOutlet,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './panel.component.html',
  standalone: true,
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['panel', {outlets: {admin: ['products']}}]).then();
  }
}
