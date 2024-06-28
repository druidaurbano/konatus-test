import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-makeup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './makeup.component.html',
  styleUrl: './makeup.component.scss'
})
export class MakeupComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  productsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.products = await this.apiService.getMakeupProducts();
      this.filteredProducts = this.products;
      this.calculateTotalPages();
    } catch (error) {
      console.error('Erro ao buscar produtos de maquiagem', error);
    }
  }

  searchProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
    this.calculateTotalPages();
  }

  sortProducts(column: string) {
    this.filteredProducts.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return this.sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  paginateProducts(page: number) {
    this.currentPage = page;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    return this.filteredProducts.slice(start, end);
  }
}
