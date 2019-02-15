import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { VotingProcess, Option } from '../../model/model';

import { VotingProcessApiService } from '../../services/api/votingProcessApi.service';
import { RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proposition-modal',
  templateUrl: './proposition-modal.component.html',
  styleUrls: ['./proposition-modal.component.sass']
})
export class PropositionModalComponent implements OnInit {
  @Input() public proposition: Option;
  @Input() public cssClass: string;
  @Output() public onValidate = new EventEmitter<boolean>();

  private modalActions = new EventEmitter<string|MaterializeAction>();
  public error: string;

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    if (this.proposition.Photo == null) {
      this.proposition.Photo = '';
    }
  }

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  update() {
    this.onValidate.emit(true);
    this.closeModal();
  }

  deletePhoto() {
    this.proposition.Photo = '';
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    const authorizedType = ['image/png', 'image/jpeg', 'image/bmp'];
    if (fileList.length > 0) {
        const file: File = fileList[0];
        if (this.checkFile(file)) {
          this.getBase64(file).then(
            data => this.proposition.Photo = data as string
          );
        }
    }
  }

  private getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  private checkFile(file: File) {
    const authorizedType = ['image/png', 'image/jpeg', 'image/bmp'];
    if (!authorizedType.includes(file.type)) {
      this.error = this.translate.instant('Proposition.FormatError');
      return false;
    } else if (file.size > 1e+6) {
      this.error = this.translate.instant('Proposition.SizeError');
      return false;
    }
    this.error = null;
    return true;
  }

}
