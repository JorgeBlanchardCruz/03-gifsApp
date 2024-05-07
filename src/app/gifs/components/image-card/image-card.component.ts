import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-image-card',
  templateUrl: './image-card.componet.html'
})
export class ImageCardComponent implements OnInit{

  @Input()
  public gifItem!: Gif;

  ngOnInit(): void {

    if (!this.gifItem) {
      throw new Error('GifItem is required');
    }

  }


}
