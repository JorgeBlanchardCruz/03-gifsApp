import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from '../interfaces/gifs.interfaces';
import { Gif } from '../interfaces/gifs.interfaces';

const TagHistoryLocalStorageKey: string = 'tagsHistory';
const MaxHistory: number = 10;
const Giphy_ApiKey: string = '2SpLREijRXdLFg3cIpNWvf9Q6XQYo3BO';
const Giphy_Endpoint: string = 'https://api.giphy.com/v1/gifs/search';
const Giphy_Limit: number = 10;

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private _gifsList: Gif[] = [];

  constructor(private http: HttpClient) {

    this.loadTagsHistory();

    this.loadGifsList();
  }

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public get gifsList(): Gif[] {
    return [...this._gifsList];
  }


  public searchTag(tag: string): void {
    if (tag.trim().length === 0)
      return;

      this.callGifsApi(tag);

      this.addTagsHistory(tag)
  }

  // // forma de hacerlo con fetch, js puro
  // public async searchTag(tag: string): Promise<void> {
  //   if (tag.trim().length === 0)
  //     return;

  //     const response = await fetch(`${Giphy_Endpoint}?api_key=${Giphy_ApiKey}&q=${tag}&limit=${Giphy_Limit}`);
  //     const data = await response.json();
  //     console.log(data);

  //     this.addTagsHistory(tag)
  // }

  private callGifsApi(tag: string): void {

    const httpParams = new HttpParams()
      .set('api_key', Giphy_ApiKey)
      .set('q', tag)
      .set('limit', Giphy_Limit.toString());

    this.http.get<SearchResponse>(`${Giphy_Endpoint}`, { params: httpParams })
      .subscribe((response) => {
        this._gifsList = response.data;
      });

  }

  private addTagsHistory(tag: string): void {
    tag = tag.trim().toLowerCase();

    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);

    if (this._tagsHistory.length === MaxHistory - 1)
      this._tagsHistory.pop();

    this._tagsHistory.unshift(tag);

    this.saveTagsHistory();
  }

  private saveTagsHistory(): void {
    localStorage.setItem(TagHistoryLocalStorageKey, JSON.stringify(this._tagsHistory));
  }

  private loadTagsHistory(): void {
    const tagsHistory = localStorage.getItem(TagHistoryLocalStorageKey);

    if (tagsHistory)
      this._tagsHistory = JSON.parse(tagsHistory);
  }

  private loadGifsList(): void {
    if (this._tagsHistory.length === 0)
      return;

    this.searchTag(this._tagsHistory[0]);
  }
}
