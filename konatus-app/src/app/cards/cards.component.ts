import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Card } from '../models/deck-of-cards.model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  cards: Card[] = [];
  filteredCards: Card[] = [];
  searchQuery: string = '';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  cardsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.cards = await this.apiService.getCards();
      this.filteredCards = this.cards;
      this.calculateTotalPages();
    } catch (error) {
      console.error('Erro ao buscar cartas', error);
    }
  }

  searchCards() {
    if (this.searchQuery) {
      this.filteredCards = this.cards.filter(card =>
        card.value.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        card.suit.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCards = this.cards;
    }
    this.calculateTotalPages();
  }

  sortCards(column: keyof Card) {
    this.filteredCards.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return this.sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  paginateCards(page: number) {
    this.currentPage = page;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredCards.length / this.cardsPerPage);
  }

  get paginatedCards() {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    const end = start + this.cardsPerPage;
    return this.filteredCards.slice(start, end);
  }
}
