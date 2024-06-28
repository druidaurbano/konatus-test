import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule]
})
export class HeaderComponent {
  selected: string = 'JSON';
  sliderPosition: number = 0;
  dropdownOpen = false;

  menuItems = [
    { name: 'JSON', position: 0 },
    { name: 'Maquiagem', position: 25 },
    { name: 'Jogos de cartas', position: 50 },
    { name: 'Futebol', position: 75 },
    //{ name: 'History', position: 80 }
  ];

  constructor(private menuService: MenuService) {}

  selectMenu(menu: any) {
    this.selected = menu.name;
    this.sliderPosition = menu.position;
    this.menuService.selectMenuItem(menu.name);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    const menu = document.querySelector('.menu');
    if(menu) {
      if(this.dropdownOpen) {
        menu.classList.add('show');
      } else {
        menu.classList.remove('show');
      }
    }
  }
}
