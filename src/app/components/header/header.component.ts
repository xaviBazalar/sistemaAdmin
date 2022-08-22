import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader=false;
  usuario:any;
  constructor(private router: Router) {
    this.usuario=sessionStorage.getItem("usuario");
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
  ];

  ngOnInit(): void {
    let dataUser:any=sessionStorage.getItem("usuario")
    
    if(dataUser!==undefined &&  dataUser!=""){
      this.usuario=JSON.parse(dataUser)
      this.showHeader=false
    }

    this.router.events.subscribe((val:any) => {
      if (val instanceof NavigationEnd) {
        if(val.url=="/home"){
          this.showHeader=false;
        }else{
          let dataUser:any=sessionStorage.getItem("usuario")
          this.usuario=JSON.parse(dataUser)
          this.showHeader=true;
          this.mostrarMenu=false;
        }
      }
      
    });

    
  }

  logout(){
    sessionStorage.setItem("usuario","")
    setTimeout(()=>{
      this.router.navigate(['home'], { });
    },500)
  }

}
