import { Component, OnInit } from '@angular/core';
import { GerenciasService } from '../../services/gerencias.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { UploadFileService } from '../../services/upload-file.service';
import { TareaDocumentosEntradaSolicitudService } from '../../services/tarea-documentos-entrada-solicitud.service';

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
  listaTareaDocumentos:any;
  listaTareaDocumentosEntradaSolicitud:any;
  mostrarTareas:boolean=false;
  isReadonly:boolean=true;
  msjSucess:boolean=false;
  showModal:boolean=false;
  minDay:string=new Date().toISOString().split("T")[0];
  regForm:any;
  regFormFile:any;
  selectedUser:boolean=false;
  isSubmitted = false;
  isSubmittedFile = false;
  usuarioLogin:any;
  idTareDocumentoEntrada:string="";
  tareaSelected:string="";
  tipoTareaSelected:string="";
  tokenTemp:number|string="";

  constructor(public gerenciaService:GerenciasService,
    public estadosService:EstadosSolicitudService,
    public solicitudService:SolicitudesService,
    public usuariosService:UsuariosService,
    public tareasServicio:TareasService,
    public contratosServicio:ContratosService,
    public tareasContratoService:TareasContratoService,
    public tareaDocumentosService:TareaDocumentosEntradaService,
    public tareaDocumentoEntradaSolicitud:TareaDocumentosEntradaSolicitudService,
    public uploadFileService:UploadFileService,
    public formBuilder: FormBuilder) {
    this.listaUsuariosGST=[];
    this.listaUsuariosBKO=[];
    let dataUser:any=sessionStorage.getItem("usuario")
    this.usuarioLogin=JSON.parse(dataUser)
    
   }

  ngOnInit(): void {
    this.regFormFile=this.formBuilder.group({
      iFile:['', Validators.required],
      //iTypeDocFile:['', Validators.required],
    })

    this.tokenTemp=new Date().getTime();

    this.regForm=this.formBuilder.group({
      iGerencia:['', Validators.required],
      iContrato:['', Validators.required],
      iTarea:['', Validators.required],
      iGst:['63005b09a608b63a870dfd59', Validators.required],
      iBko:['', Validators.required],
      iMensaje:['', Validators.required],
      iFechaSolicitud:[this.getFecActual(), Validators.required],
      //iEstadoSolicitud:['', Validators.required],
      iFechaInicio:[this.getFecEntrega(), Validators.required],
     })

     //this.regForm.controls['iGst'].setValue(this.default, {onlySelf: true});
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


    this.tareaDocumentoEntradaSolicitud.getTareaDocumentosEntradaSolicitud("").subscribe((data:any)=>{
      
      this.listaTareaDocumentosEntradaSolicitud=data.tarea_documentos_entrada_solicitud;
    })

    
  }

  getFecActual(){
    let hoy = new Date();
    let i=0;
    let fecha = hoy.getDate()+ '/' + ((hoy.getMonth())+1) + '/' + hoy.getFullYear();
    let mes:any=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia:any=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;
    return hoy.getFullYear()+"-"+mes+"-"+dia
  }

  getFecEntrega(){
    let hoy = new Date();
    let i=0;
    while (i<1) { // 1 días habile siguiente
        hoy.setTime(hoy.getTime()+24*60*60*1000); // añadimos 1 día
        if (hoy.getDay() != 6 && hoy.getDay() != 0)
            i++;  
    }
    let fecha = hoy.getDate()+ '/' + ((hoy.getMonth())+1) + '/' + hoy.getFullYear();
    let mes:any=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia:any=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;
    return hoy.getFullYear()+"-"+mes+"-"+dia
  }

  seleccionarGST(usuario:any){
    if(this.usuarioLogin.perfil.sigla==usuario){
      return true;
    }else{
      return false;
    }
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

  getTareaDocumentosEntrada({ target }:any) {
    this.tareaSelected=target.value
    let tarea=target.value;
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

  refreshTareaDocumentosEntradaSolicitud() {
    this.tareaDocumentoEntradaSolicitud.getTareaDocumentosEntradaSolicitud("").subscribe((data:any)=>{
      this.listaTareaDocumentosEntradaSolicitud=data.tarea_documentos_entrada_solicitud;
    })
  }

  refreshTareaDocumentosEntrada(){
    let tarea=this.tareaSelected;
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

  validateTareDocumentoSolicitud(id:string){
    let validacion=false
    for(let tareDocumentoSolicitud of this.listaTareaDocumentosEntradaSolicitud){
      if(tareDocumentoSolicitud.tarea_documento._id==id && tareDocumentoSolicitud.randomId==this.tokenTemp){
        validacion=true
        break
      }
    }

    return validacion
  }

  saveTypeDocFile(valor:string,tipoArchivo:string){
    this.idTareDocumentoEntrada=valor;
    this.tipoTareaSelected=tipoArchivo
    let inputF=document.querySelector('#file')
    if(this.tipoTareaSelected=="word"){
      inputF?.setAttribute("accept",".doc,.docx")
    }

    if(this.tipoTareaSelected=="excel"){
      inputF?.setAttribute("accept",".xls,.xlsx")
    }

    if(this.tipoTareaSelected=="pdf"){
      inputF?.setAttribute("accept",".pdf")
    }

  }

  validateFile(validado:any){
    if(validado){
      return true;
    }else{
      return false;
    }
  }

  addFileTarea(){

    let previewFile:any=document.querySelector("#customFileLang")
    var formData = new FormData();
    const imagefile = document.querySelector('#file') as HTMLInputElement;
    const imanProd=imagefile.files instanceof FileList
    ? imagefile.files[0] : ''
    formData.append("archivo", imanProd);

    this.isSubmittedFile=true;
    let observacion:any=document.querySelector("#iObsFile") 
    if (this.regFormFile.dirty && this.regFormFile.valid && this.idTareDocumentoEntrada!="") {
        this.uploadFileService.addFileToApp(formData).subscribe((data:any)=>{
          
          /*let dataUpdate={
            _id:this.idTareDocumentoEntrada,
            validado:true,
            url_ref:"/api/upload?id="+data.urlFile,
            observacion:observacion.value,
            randomId:this.tokenTemp
          } */

          let dataAdd={
            tarea_documento:this.idTareDocumentoEntrada,
            validado:true,
            url_ref:"/api/upload?id="+data.urlFile,
            observacion:observacion.value,
            randomId:this.tokenTemp
          } 

          this.tareaDocumentoEntradaSolicitud.addTareaDocumentosEntradaSolicitud(dataAdd).subscribe((data:any)=>{
            //this.refreshTareaDocumentosEntrada()
            this.refreshTareaDocumentosEntradaSolicitud()
            this.isSubmittedFile=false
            this.regFormFile.reset()
            this.idTareDocumentoEntrada=""
            previewFile.value=""
            this.isSubmittedFile=false;
         })

          /*this.tareaDocumentosService.updateTareaDocumentosEntrada(dataUpdate,this.idTareDocumentoEntrada).subscribe((data:any)=>{
              this.refreshTareaDocumentosEntrada()
              this.isSubmittedFile=false
              this.regFormFile.reset()
              this.idTareDocumentoEntrada=""
              previewFile.value=""
              this.isSubmittedFile=false;
          })*/

        })
    }
  }

  get errorControl() {
    return this.regForm.controls;
  }

  get errorControlFile() {
    return this.regFormFile.controls;
  }

  //document.getElementById("myBtn").addEventListener("click", displayDate);

  openUploadFile(){
    let file:any=document.querySelector("#file");
    file.click();
  }

  changeUploadFile(){
    let file:any=document.querySelector("#file");
    let previewFile:any=document.querySelector("#customFileLang")
    file=file.value.replace(/C:\\fakepath\\/i,'');
    previewFile.value=file
  }

  addSolicitud() {
    let solicitud:any
    this.isSubmitted=true;
    if (this.regForm.dirty && this.regForm.valid) {
      
      solicitud={
        gerencia:this.regForm.value.iGerencia,
        contrato:this.regForm.value.iContrato,
        tarea:this.regForm.value.iTarea,
        gst:this.regForm.value.iGst,
        bko:this.regForm.value.iBko,
        estado_solicitud:"62fad5ed48d35ca4acd1467d",
        estado_resultado:"62fad65648d35ca4acd14682",
        observacion:this.regForm.value.iMensaje,
        fecha_solicitud:this.regForm.value.iFechaSolicitud,
        fecha_inicio:this.regForm.value.iFechaInicio,
        randomId:this.tokenTemp
      }

      this.solicitudService.addSolicitud(solicitud).subscribe((data:any)=>{
        //console.log(data)
        this.regForm.reset();
        this.msjSucess=true;
        this.showModal=true;
        
      })

      setTimeout(()=>{
        this.msjSucess=false;
        this.showModal=false;
      },2000)



    }
  }

}
