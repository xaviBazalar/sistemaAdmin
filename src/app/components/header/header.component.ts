import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader=true;
  constructor(private router: Router) {
    this.router.events.subscribe((val:any) => {
      if (val instanceof NavigationEnd) {
        //console.log(val.url)
        if(val.url=="/home"){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    });
   }

  ngOnInit(): void {

  }

}
