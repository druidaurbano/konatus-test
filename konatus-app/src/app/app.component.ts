import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { MakeupComponent } from './makeup/makeup.component';
import { CardsComponent } from './cards/cards.component';
import { FootballComponent } from './football/football.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    FooterComponent,
    PostsComponent,
    MakeupComponent,
    CardsComponent,
    FootballComponent,
    TableModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'konatus-app';
}
