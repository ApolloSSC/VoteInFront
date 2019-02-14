import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SEOService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private translate: TranslateService) { }

    public addSeoData() : void {
      this.router.events.filter((event: any) => event instanceof NavigationEnd).subscribe(() => {
          var root = this.router.routerState.snapshot.root;
          while (root) {
            if (root.children && root.children.length) {
              root = root.children[0];
            } else if (root.data && root.data["title"]) {
              this.translate.get(root.data["title"]).subscribe((res : string) => {
                this.titleService.setTitle(res + " | VoteIn");
              });
              let tags = root.data["metatags"];
              for (let tag in tags) {
                this.translate.get(tags[tag]).subscribe((res : string) => {
                  this.metaService.addTag({ name: tag, content: res });
                });
              }
              return;
            } else {
             return;
            }
          }
        });
    }

}
