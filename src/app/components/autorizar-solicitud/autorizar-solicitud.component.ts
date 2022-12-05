import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';
import { AutorizarSolicitudService } from '../../services/autorizar-solicitud.service';

@Component({
  selector: 'app-autorizar-solicitud',
  templateUrl: './autorizar-solicitud.component.html',
  styleUrls: ['./autorizar-solicitud.component.css']
})
export class AutorizarSolicitudComponent implements OnInit {
  solicitud:any={
    contrato:{
      contrato:"",
      contradoid:""
    },
    tarea:{
      nombre_tarea:""
    }
  }
  id_solicitud:string|null  ="";
  showModalTemp:boolean=false
  solicitudAutorizada:boolean=false
  usuario:any
  solicitudValidada:boolean=false
  validacionPin:boolean=true
  constructor(
    private router: Router,
    public _route:ActivatedRoute,
    public solicitudService:SolicitudesService,
    public autorizarSolicitudService:AutorizarSolicitudService) { 
    this.id_solicitud=this._route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.solicitudService.getSolicitud(this.id_solicitud).subscribe(
      (data:any) => {
        this.solicitud=data.solicitudes[0]
        //this.solicitudValidada=this.solicitud.autorizacion_terminada
      }
    );
    let dataUser:any=localStorage.getItem("usuario");
    this.usuario=JSON.parse(dataUser)
  }

  openModal(){
    this.showModalTemp=true
  }

  acceptModal(){
    let dataUpdate:any={
      solicitud:this.solicitud._id,
      usuario:this.usuario._id,
      autorizado:true,
    }

    let pin:any=document.querySelector("#nro_pin")
    let data_url=`pin=${pin.value}&usuario_=${this.usuario._id}`

    this.autorizarSolicitudService.validatePinAutorizacion(data_url).subscribe(
      (data:any) => {
        if(data.total==1){
          this.validacionPin=true
          this.updateAutorizacionSolicitud(dataUpdate)
        }else{
          this.validacionPin=false
        }
      }
    );
    /**/
  }

  updateAutorizacionSolicitud(dataUpdate:any){
    this.autorizarSolicitudService.updateAutorizacionSolicitud(dataUpdate).subscribe(
      (data:any) => {
        this.solicitudAutorizada=true
        this.closeModal()
        setTimeout(()=>{
          this.router.navigate(['/misSolicitudes', { }]);
        },1700)
      }
    );
  }

  closeModal(){
    this.showModalTemp=false
  }

}
