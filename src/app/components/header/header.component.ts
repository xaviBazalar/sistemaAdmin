import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader=true;
  usuario:any;
  constructor(private router: Router) {
    let dataUser:any=sessionStorage.getItem("usuario")
    if(dataUser!==undefined){
      this.usuario=JSON.parse(dataUser)
      this.showHeader=false
    }
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

   mostrarMenu= false;

   itemMenu:any= [
    {
      titulo:"NuevaSolicitud",
      url:"/nuevaSolicitud"
    },
    {
      titulo:"MisSolictudes",
      url:"/misSolicitudes"
    },
    {
      titulo:"Tareas",
      url:"/lista"
    },
    {
      titulo:"Salir",
      url:"/"
    },
  ];

  ngOnInit(): void {

  }

}
