import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sisadmin';
  constructor(private translate:TranslateService){
    this.setAppLanguage()
  }

  setAppLanguage(){
    let lang:any=this.translate.getBrowserLang()
    this.translate.setDefaultLang("es");
    this.translate.use(lang)
  }
  
  ngOnInit(): void {
  }

}
