import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.sass']
})
export class ColorPickerComponent implements OnInit {

  private couleurValue: string = '';
  public defaultColors: Array<string>;
  

  @Input() resetable: boolean = true;

  @Input() get couleur(){
    return this.couleurValue;
  }
  @Output() couleurChange = new EventEmitter();

  set couleur(val) {
    this.couleurValue = val;
    this.couleurChange.emit(this.couleurValue);
  }

  constructor() {
    this.defaultColors=ConstantsService.pickerColors;
   }

  ngOnInit() {
  }

}
