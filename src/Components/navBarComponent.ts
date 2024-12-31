import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
  <nav class="navbar">
    <!-- Logo Section -->
    <div class="navbar-logo">
      <span class="navbar-title">
        <a class="TitleLink" routerLink="/"  ariaCurrentWhenActive="page">Learn</a>
      </span>
    </div>

    <!-- Navigation Links -->
    <ul class="navbar-links">
      <li>
        <a routerLink="/Courses" routerLinkActive="active" ariaCurrentWhenActive="page" class="navbar-link">Courses</a>
      </li>
      <li>
        <a routerLink="/Categories" routerLinkActive="active" ariaCurrentWhenActive="page" class="navbar-link">Category</a>
      </li>
    </ul>
  </nav>
  `,
  styles: [`
  .navbar {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    background-color: aliceblue;
    border-bottom: 1px solid #ddd;
    font-family: Arial, sans-serif;
    justify-content: space-between;
    font-size: 30px;
    margin-bottom: 20px;
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
    display: flex;
    gap: 20px;
    margin: 0 auto;
    padding: 0;
  }

  .navbar-link {
    text-decoration: none;
    font-size: 20px;
    color: rgb(8, 107, 212);
    padding: 8px 16px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
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
