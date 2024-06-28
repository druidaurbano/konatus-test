import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    try {
      this.posts = await this.apiService.getPosts();
      this.filteredPosts = this.posts;
      this.calculateTotalPages();
    } catch(error) {
      console.error('Erro ao buscar posts', error);
    }
  }

  searchPosts() {
    if(this.searchQuery) {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }

    this.calculateTotalPages();
  }

  sortPosts(column: string) {
    this.filteredPosts.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return this.sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
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
