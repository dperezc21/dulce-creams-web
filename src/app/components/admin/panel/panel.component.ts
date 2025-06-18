import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-panel',
  imports: [
    /*    RouterLink,
        RouterLinkActive,*/
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
export class PanelComponent {

}
