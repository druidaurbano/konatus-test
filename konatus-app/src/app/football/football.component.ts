import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-football',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './football.component.html',
  styleUrl: './football.component.scss'
})
export class FootballComponent implements OnInit {
  teams: any[] = [];
  filteredTeams: any[] = [];
  searchQuery: string = '';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  teamsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.teams = await this.apiService.getFootballTeams();
      this.filteredTeams = this.teams;
      this.calculateTotalPages();
    } catch (error) {
      console.error('Erro ao buscar dados de futebol', error);
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
  }

  sortTeams(column: keyof typeof this.teams[0]) {
    this.filteredTeams.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return this.sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  paginateTeams(page: number) {
    this.currentPage = page;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredTeams.length / this.teamsPerPage);
  }

  get paginatedTeams() {
    const start = (this.currentPage - 1) * this.teamsPerPage;
    const end = start + this.teamsPerPage;
    return this.filteredTeams.slice(start, end);
  }
}
