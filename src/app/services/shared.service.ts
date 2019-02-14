import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, BehaviorSubject } from 'rxjs/Rx';
import { MaterializeModule } from 'angular2-materialize';

declare var Materialize: any;

@Injectable()
export class SharedService {
    //Loading screen
    public loading: boolean = false;
    public countLoading: number = 0;

    //Reception de messages globaux
    public onMessageGlobal = new Subject<string>();

    constructor() {
        this.loading = false;
    }

    startLoading() {
        this.countLoading++;
        setTimeout(() => {
            this.loading = true;
        }, 0);
    }
    endLoading() {
        this.countLoading = Math.max(0, this.countLoading - 1);
        if (this.countLoading == 0) {
            setTimeout(() => {
                this.loading = false;
            }, 0);
        }
    }

    //Toastr
    successToast(txt: string) {
        Materialize.toast(txt,2000,'rounded teal darken-1');
    }

    errorToast(txt: string) {
        Materialize.toast(txt,2000,'rounded red darken-1');
    }

    randomAESKey(bytes: number): Uint8Array{
        let array = new Uint8Array(bytes);
        for(let i = 0; i < bytes; ++i){
            array[i] = Math.floor(Math.random() * 2**8);
        }
        return array;
    }
}