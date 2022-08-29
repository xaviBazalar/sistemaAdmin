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
      this.solicitudService.getSolicitudes().subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })
    }else{
      this.solicitudUsuarioService.getSolicitudesUsuario(this.usuario._id).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })
    }
    
  }

  

}
