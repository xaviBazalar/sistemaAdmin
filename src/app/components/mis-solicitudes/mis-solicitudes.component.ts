import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {

  listaSolicitudes:any;
  listaSolicitudesPendiente:any;
  listaSolicitudesAsignadas:any;
  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(sessionStorage.getItem("usuario") || '{}');
  constructor(
    public solicitudService:SolicitudesService,
    public solicitudUsuarioService:SolitudesUsuarioService
  ) { }
//getSolicitudes
  ngOnInit(): void {
    if(this.usuario.perfil.sigla=="ADC"){
      let dataFilterIngresadas:any={
        ingresado:true,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })

      let dataFilter:any={
        ingresado:false,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
        this.listaSolicitudesPendiente=data.solicitudes;
      })

      

    }else{
      /*this.solicitudUsuarioService.getSolicitudesUsuario(this.usuario._id).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })*/

      let dataFilterIngresadas:any={
        ingresado:true,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })

      let dataFilter:any={
        ingresado:false,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
        this.listaSolicitudesPendiente=data.solicitudes;
      })

 
      let perfil=this.usuario.perfil.sigla
      let dataFilterAsignado:any;
      if(perfil=="GST"){
        dataFilterAsignado={
          ingresado:true,
          gst:this.usuario._id
        }
      }

      if(perfil=="BKO"){
        dataFilterAsignado={
          ingresado:true,
          bko:this.usuario._id
        }
      }
      this.solicitudService.getSolicitudesFilter(dataFilterAsignado).subscribe((data:any)=>{
        this.listaSolicitudesAsignadas=data.solicitudes;
        console.log(data.solicitudes)
      })
    }
    
  }

  

}
