import { MenuService } from './../services/menu.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { MakeupComponent } from '../makeup/makeup.component';
import { CardsComponent } from '../cards/cards.component';
import { FootballComponent } from '../football/football.component';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    CommonModule,
    PostsComponent,
    MakeupComponent,
    CardsComponent,
    FootballComponent
  ]
})
export class ContentComponent implements OnInit{
  selectedMenuItem: string = 'Maquiagem';

  constructor(private menuService: MenuService) { }

  ngOnInit() {
      this.menuService.selectedMenuItem$.subscribe(menuItem => {
        this.selectedMenuItem = menuItem;
      });
  }
}
