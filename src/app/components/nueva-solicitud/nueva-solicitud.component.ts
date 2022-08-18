import { Component, OnInit } from '@angular/core';
import { GerenciasService } from '../../services/gerencias.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css']
})
export class NuevaSolicitudComponent implements OnInit {
  
  listaGerencias:any;
  listaSolicitudes:any;
  listaUsuarios:any;
  listaUsuariosGST:any;
  listaUsuariosBKO:any;
  listatareas:any;
  listaContratos:any;
  listaTareasContrato:any;
  mostrarTareas:boolean=false;
  isReadonly:boolean=true;
  msjSucess:boolean=false;
  showModal:boolean=false;
  minDay:string=new Date().toISOString().split("T")[0];
  regForm:any;

  usuario:any;

  constructor(public gerenciaService:GerenciasService,
    public estadosService:EstadosSolicitudService,
    public solicitudService:SolicitudesService,
    public usuariosService:UsuariosService,
    public tareasServicio:TareasService,
    public contratosServicio:ContratosService,
    public tareasContratoService:TareasContratoService,
    public formBuilder: FormBuilder) {
    this.listaUsuariosGST=[];
    this.listaUsuariosBKO=[];
    let dataUser:any=sessionStorage.getItem("usuario")
    this.usuario=JSON.parse(dataUser)
    
   }

  ngOnInit(): void {
    this.regForm=this.formBuilder.group({
      iGerencia:['', Validators.required],
      iContrato:['', Validators.required],
      iTarea:['', Validators.required],
      iGst:['', Validators.required],
      iBko:['', Validators.required],
      iMensaje:['', Validators.required],
      iFechaSolicitud:['', Validators.required],
      iEstadoSolicitud:['', Validators.required],
      iFechaInicio:['', Validators.required],
     })

    this.gerenciaService.getGerencias().subscribe((data:any)=>{
      this.listaGerencias=data.gerencias;
    })

    this.estadosService.getSolicitudes().subscribe((data:any)=>{
      this.listaSolicitudes=data.estadoSolicitudes;
    })


    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      this.listaUsuarios=data.usuarios;
      for (const usuario of data.usuarios) {
        if(usuario.perfil.sigla=="GST"){
          this.listaUsuariosGST.push(usuario)
        }

        if(usuario.perfil.sigla=="BKO"){
          this.listaUsuariosBKO.push(usuario)
        }
      }
    })

    this.tareasServicio.getTareas().subscribe((data:any)=>{
      this.listatareas=data.tareas;
     
    })

    this.contratosServicio.getContratos().subscribe((data:any)=>{
      this.listaContratos=data.contratos;
     
    })
  }

  getTareasContrato({ target }:any) {
    let idContrato=target.value;
    this.tareasContratoService.getTareasContrato(idContrato).subscribe((data:any)=>{
      if(data.tareas.length>0){
        this.listaTareasContrato=data.tareas;
        this.mostrarTareas=true;
      }else{
        this.mostrarTareas=false;
      }
      
     
    })
  }

  addSolicitud() {
    let solicitud:any
    if (this.regForm.dirty && this.regForm.valid) {
      solicitud={
        gerencia:this.regForm.value.iGerencia,
        contrato:this.regForm.value.iContrato,
        tarea:this.regForm.value.iTarea,
        gst:this.regForm.value.iGst,
        bko:this.regForm.value.iBko,
        estado_solicitud:this.regForm.value.iEstadoSolicitud,
        observacion:this.regForm.value.iMensaje,
        fecha_solicitud:this.regForm.value.iFechaSolicitud,
        fecha_inicio:this.regForm.value.iFechaInicio
      }

      this.solicitudService.addSolicitud(solicitud).subscribe((data:any)=>{
        console.log(data)
        this.regForm.reset();
        this.msjSucess=true;
        this.showModal=true;
        
      })

      setTimeout(()=>{
        this.msjSucess=false;
        this.showModal=false;
      },3000)

      
      /*
      gerencia: { type: Schema.ObjectId, ref: "gerencia" },
      contrato: { type: Schema.ObjectId, ref: "contrato" },
      tarea: { type: Schema.ObjectId, ref: "tarea" },
      gst: { type: Schema.ObjectId, ref: "gst" },
      bko: { type: Schema.ObjectId, ref: "bko" },
      estado_solicitud : { type: Schema.ObjectId, ref: "bko" },
      observacion: {
          type: String
      },
      fecha_solicitud: {
          type: String
      },
      fecha_inicio: {
          type: String
      }
      */
      //alert(`iGerencia: ${this.regForm.value.iGerencia}`);

    }
  }

}
