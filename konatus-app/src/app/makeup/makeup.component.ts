import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-makeup',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './makeup.component.html',
  styleUrl: './makeup.component.scss'
})
export class MakeupComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  searchQuery: string = '';
  sortOrder: number = 1;
  sortField: string = '';
  currentPage: number = 1;
  productsPerPage: number = 10;
  totalPages: number = 1;
  maxPaginationButtons: number = 6;
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.products = await this.apiService.getMakeupProducts();
      this.filteredProducts = this.products;
      this.calculateTotalPages();
      this.updatePaginatedProducts();
      this.loading = false;
    } catch (error) {
      console.error('Erro ao buscar produtos de maquiagem', error);
      this.loading = false;
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
    this.updatePaginatedProducts();
  }

  sortProducts(field: string) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    this.filteredProducts.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      return this.sortOrder === 1 ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    this.updatePaginatedProducts();
  }

  onSort(event: SortEvent) {
    this.sortField = event.field || this.sortField;
    this.sortOrder = event.order || this.sortOrder;
    this.sortProducts(this.sortField);
  }

  onPage(event: any) {
    this.currentPage = event.page + 1;
    this.productsPerPage = event.rows;
    //this.updatePaginatedProducts();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
  }

  updatePaginatedProducts() {
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  paginateProducts(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
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
      this.paginateProducts(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.paginateProducts(this.currentPage + 1);
    }
  }

  firstPage() {
    this.paginateProducts(1);
  }

  lastPage() {
    this.paginateProducts(this.totalPages);
  }
}
