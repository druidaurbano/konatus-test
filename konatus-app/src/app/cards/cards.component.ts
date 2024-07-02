import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Card } from '../models/deck-of-cards.model';
import { TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  cards: any[] = [];
  filteredCards: any[] = [];
  paginatedCards: any[] = [];
  searchQuery: string = '';
  sortOrder: number = 1; // 1 for asc and -1 for desc
  sortField: string = '';
  currentPage: number = 1;
  cardsPerPage: number = 10;
  totalPages: number = 1;
  maxPaginationButtons: number = 10; // Máximo de botões de paginação a serem exibidos
  loading: boolean = true; // Variável para controlar o estado de carregamento

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.cards = await this.apiService.getCards();
      this.filteredCards = this.cards;
      this.calculateTotalPages();
      this.updatePaginatedCards();
      this.loading = false;
    } catch (error) {
      console.error('Erro ao buscar cartas', error);
      this.loading = false;
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
      this.updatePaginatedCards();
    }
    this.calculateTotalPages();
  }

  sortCards(field: string) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    this.filteredCards.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      return this.sortOrder === 1 ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    this.updatePaginatedCards();
  }

  onSort(event: SortEvent) {
    this.sortField = event.field || this.sortField;
    this.sortOrder = event.order || this.sortOrder;
    this.sortCards(this.sortField);
  }

  onPage(event: any) {
    this.currentPage = event.page + 1;
    this.cardsPerPage = event.rows;
    this.updatePaginatedCards();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredCards.length / this.cardsPerPage);
  }

  updatePaginatedCards() {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    const end = start + this.cardsPerPage;
    this.paginatedCards = this.filteredCards.slice(start, end);
  }

  paginateCards(page: number) {
    this.currentPage = page;
    this.updatePaginatedCards();
  }

  getPaginationButtons(): number[] {
    const buttons: number[] = [];
    const start = Math.max(1, this.currentPage - Math.floor(this.maxPaginationButtons / 2));
    const end = Math.min(this.totalPages, start + this.maxPaginationButtons - 1);

    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }

    return buttons;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.paginateCards(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.paginateCards(this.currentPage + 1);
    }
  }

  firstPage() {
    this.paginateCards(1);
  }

  lastPage() {
    this.paginateCards(this.totalPages);
  }
}
