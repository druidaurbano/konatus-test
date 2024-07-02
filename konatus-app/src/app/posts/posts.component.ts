import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  imports: [CommonModule, FormsModule, TableModule]
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';
  sortOrder: number = 1; // 1 for asc and -1 for desc
  sortField: string = '';
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.posts = await this.apiService.getPosts();
      this.filteredPosts = this.posts;
      this.calculateTotalPages();
    } catch (error) {
      console.error('Erro ao buscar posts', error);
    }
  }

  searchPosts() {
    if (this.searchQuery) {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }
    this.calculateTotalPages();
  }

  sortPosts(field: string) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    this.filteredPosts.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      return this.sortOrder === 1 ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }

  paginatePosts(page: number) {
    this.currentPage = page;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
  }

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    return this.filteredPosts.slice(start, end);
  }
}
