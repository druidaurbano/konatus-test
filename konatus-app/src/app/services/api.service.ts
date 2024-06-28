import { Injectable } from '@angular/core';
import axios from 'axios';
import { Card, DeckOfCardsResponse } from '../models/deck-of-cards.model';
import { FootballDataResponse, Team } from '../models/football-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private makeupApiUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json';
  private deckOfCardsApiUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=10';
  private footballDataApiUrl = 'https://api.football-data.org/v2';
  private apiKey = 'eed521002307481086ba4ead9ea7989a'; // Substitua pela sua chave de API

  async getPosts() {
    try {
      const response = await axios.get<any[]>(`${this.apiUrl}/posts`);
      return response.data;
    } catch(error) {
      console.error('Erro ao buscar posts', error);
      throw error;
    }
  }

  async getMakeupProducts(): Promise<any[]> {
    try {
      const response = await axios.get<any[]>(this.makeupApiUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos de maquiagem', error);
      throw error;
    }
  }

  async getCards(): Promise<Card[]> {
    try {
      const response = await axios.get<DeckOfCardsResponse>(this.deckOfCardsApiUrl);
      return response.data.cards;
    } catch (error) {
      console.error('Erro ao buscar cartas', error);
      throw error;
    }
  }

  async getFootballTeams(): Promise<Team[]> {
    try {
      const response = await axios.get<FootballDataResponse>(`${this.footballDataApiUrl}/teams`, {
        headers: { 'X-Auth-Token': this.apiKey }
      });
      return response.data.teams;
    } catch (error) {
      console.error('Erro ao buscar dados de futebol', error);
      throw error;
    }
  }
}
