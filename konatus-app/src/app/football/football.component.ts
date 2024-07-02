import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-football',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './football.component.html',
  styleUrl: './football.component.scss'
})
export class FootballComponent implements OnInit {
  teams: any[] = [];
  filteredTeams: any[] = [];
  paginatedTeams: any[] = [];
  searchQuery: string = '';
  sortOrder: number = 1; // 1 for asc and -1 for desc
  sortField: string = '';
  currentPage: number = 1;
  teamsPerPage: number = 10;
  totalPages: number = 1;
  maxPaginationButtons: number = 10; // Máximo de botões de paginação a serem exibidos
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.teams = await this.apiService.getFootballTeams();
      this.filteredTeams = this.teams;
      this.calculateTotalPages();
      this.updatePaginatedTeams();
      this.loading = false;
    } catch (error) {
      console.error('Erro ao buscar dados de futebol', error);
      this.loading = false;
    }
  }

  searchTeams() {
    if (this.searchQuery) {
      this.filteredTeams = this.teams.filter(team =>
        team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredTeams = this.teams;
    }
    this.calculateTotalPages();
    this.updatePaginatedTeams();
  }

  sortTeams(field: string) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    this.filteredTeams.sort((a, b) => {
      const aValue = field.split('.').reduce((o, i) => o[i], a);
      const bValue = field.split('.').reduce((o, i) => o[i], b);
      return this.sortOrder === 1 ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    this.updatePaginatedTeams();
  }

  onSort(event: SortEvent) {
    this.sortField = event.field || this.sortField;
    this.sortOrder = event.order || this.sortOrder;
    this.sortTeams(this.sortField);
  }

  onPage(event: any) {
    this.currentPage = event.page + 1;
    this.teamsPerPage = event.rows;
    this.updatePaginatedTeams();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredTeams.length / this.teamsPerPage);
  }

  updatePaginatedTeams() {
    const start = (this.currentPage - 1) * this.teamsPerPage;
    const end = start + this.teamsPerPage;
    this.paginatedTeams = this.filteredTeams.slice(start, end);
  }

  paginateTeams(page: number) {
    this.currentPage = page;
    this.updatePaginatedTeams();
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
      this.paginateTeams(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.paginateTeams(this.currentPage + 1);
    }
  }

  firstPage() {
    this.paginateTeams(1);
  }

  lastPage() {
    this.paginateTeams(this.totalPages);
  }
}
