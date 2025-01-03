import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule, MatSidenavModule, MatToolbarModule, MatIconModule, RouterOutlet],
  template: `
    <nav class="navbar">
      <!-- Logo Section -->
      <mat-toolbar>
        <button mat-icon-button class="example-icon" mat-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <div class="navbar-logo" style="margin: 10px; font-size: 30px;">
          <span class="navbar-title">
            <a class="TitleLink" routerLink="/"  ariaCurrentWhenActive="page">Learn</a>
          </span>
        </div>  
      </mat-toolbar>
    </nav>
    <mat-drawer-container class="example-container" autosize  >
      <mat-drawer #drawer class="example-sidenav" mode="side" style="width: 15%;">
      <!-- Navigation Links -->
        <ul class="navbar-links">
          <li>
            <a routerLink="/Courses" routerLinkActive="active" ariaCurrentWhenActive="page" class="navbar-link">Courses</a>
          </li>
          <li>
            <a routerLink="/Categories" routerLinkActive="active" ariaCurrentWhenActive="page" class="navbar-link">Category</a>
          </li>
        </ul>
      </mat-drawer>
      <router-outlet />
    </mat-drawer-container>
  `,
  styles: [`
  .navbar {   
    background-color: aliceblue;
    border-bottom: 1px solid #ddd;
    font-family: Arial, sans-serif;
    justify-content: space-between;
    font-size: 30px;
  }

  .navbar-title {
    font-weight: bold;
  }

  .TitleLink {
    text-decoration: none;
    color: rgb(4, 70, 139);
  }

  .navbar-links {
    list-style: none;
    padding: 0 10px;
$  }

  .navbar-link {
    text-decoration: none;
    display: block;
    font-size: 20px;
    color: rgb(8, 107, 212);
    padding: 8px 16px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    margin: 10px 0;
  }

  .navbar-link:hover {
    background-color:rgba(0, 87, 179, 0.18);
    color: #0056b3;
  }

  .active {
    background-color: #0056b3;
    color: white;
  }
  `]
})
export class NavBarComponent {}
