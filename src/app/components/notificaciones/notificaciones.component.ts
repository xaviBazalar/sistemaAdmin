import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  listaNotificaciones:any=[]
  listaNotificacionesLeidas:any=[]
  listaNotificacionesNoLeidas:any=[]
  usuario:any
  constructor(
    public notificacionesUsuarioService:NotificacionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let dataUser:any=localStorage.getItem("usuario")
    this.usuario=JSON.parse(dataUser)
    this.notificacionesUsuarioService.getNotificacionesUsuario(this.usuario._id,true).subscribe((data:any)=>{
      this.listaNotificaciones=data.notificaciones_usuario
      this.listaNotificacionesLeidas=this.listaNotificaciones.filter((data:any)=>data.visto==true)
      this.listaNotificacionesNoLeidas=this.listaNotificaciones.filter((data:any)=> data.visto==false)
    });
  }

  updateNotificacion(id:string,link:string){
    let dataUpdate:any={
      _id:id,
      visto:true
    }

    this.notificacionesUsuarioService.updateNotificacionesUsuario(id,dataUpdate).subscribe((data:any)=>{
      //console.log(data)
      this.router.navigate([link], { });
    })
  }

}
