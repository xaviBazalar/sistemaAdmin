import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenciasService } from '../../services/gerencias.service';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { TareaDocumentosEntradaSolicitudService } from '../../services/tarea-documentos-entrada-solicitud.service';
import { UploadFileService } from '../../services/upload-file.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitud-pendiente',
  templateUrl: './solicitud-pendiente.component.html',
  styleUrls: ['./solicitud-pendiente.component.css']
})
export class SolicitudPendienteComponent implements OnInit {

  listaGerencias:any;
  listaSolicitudes:any;
  listaUsuarios:any;
  listaUsuariosGST:any;
  listaUsuariosBKO:any;
  listatareas:any;
  listaContratos:any;
  listaTareasContrato:any;
  listaTareaDocumentos:any;
  listaTareaDocumentosEntradaSolicitud:any=[];
  mostrarTareas:boolean=false;
  isReadonly:boolean=true;
  msjSucess:boolean=false;
  showModal:boolean=false;
  showModalTemp:boolean=false;
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
  msjNoSucess:boolean=false
  dataSolicitud:any;
  id_solicitud:string | null="";
  constructor(
    public _route:ActivatedRoute,
    public gerenciaService:GerenciasService,
    public estadosService:EstadosSolicitudService,
    public solicitudService:SolicitudesService,
    public usuariosService:UsuariosService,
    public tareasServicio:TareasService,
    public contratosServicio:ContratosService,
    public tareasContratoService:TareasContratoService,
    public tareaDocumentosService:TareaDocumentosEntradaService,
    public tareaDocumentoEntradaSolicitud:TareaDocumentosEntradaSolicitudService,
    public uploadFileService:UploadFileService,
    private router: Router,
    public formBuilder: FormBuilder) {
      this.listaUsuariosGST=[];
      this.listaUsuariosBKO=[];
      let dataUser:any=sessionStorage.getItem("usuario")
      this.usuarioLogin=JSON.parse(dataUser)
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
    }

    async ngOnInit(): Promise<void> {
    let idSolicitud=this._route.snapshot.paramMap.get("id");
    this.id_solicitud=this._route.snapshot.paramMap.get("id");
 

    const dataSolicitud :any = await this.solicitudService.getSolicitud(idSolicitud).toPromise();
    this.dataSolicitud=dataSolicitud.solicitudes[0];
    this.tokenTemp=this.dataSolicitud.randomId
    
    this.regForm=this.formBuilder.group({
      iGerencia:[this.dataSolicitud.gerencia._id, Validators.required],
      iContrato:[this.dataSolicitud.contrato.contrato, Validators.required],
      iTarea:[this.dataSolicitud.tarea._id, Validators.required],
      iGst:['63005b09a608b63a870dfd59', Validators.required],
      iBko:[this.dataSolicitud.bko._id, Validators.required],
      iMensaje:[this.dataSolicitud.observacion, Validators.required],
      iFechaSolicitud:[this.dataSolicitud.fecha_solicitud, Validators.required],
      //iEstadoSolicitud:['', Validators.required],
      iFechaInicio:[this.dataSolicitud.fecha_inicio, Validators.required],
     })

     this.getTareasContratoTemp(this.dataSolicitud.contrato._id)

    this.regFormFile=this.formBuilder.group({
      iFile:['', Validators.required],
      //iTypeDocFile:['', Validators.required],
    })

    //this.tokenTemp=new Date().getTime();

    

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


    this.tareaDocumentoEntradaSolicitud.getTareaDocumentosEntradaSolicitud(this.tokenTemp).subscribe((data:any)=>{
      this.listaTareaDocumentosEntradaSolicitud=data.tarea_documentos_entrada_solicitud;
    })

    this.getTareaDocumentosEntradaTemp(this.dataSolicitud.tarea._id)
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
    let contratoTxt=target.value;
    
    let idContrato:string=""
    for(let contrato of this.listaContratos){
      if(contrato.contrato==contratoTxt){
        idContrato=contrato._id
      }
    } 

    this.tareasContratoService.getTareasContrato(idContrato).subscribe((data:any)=>{
      if(data.tareas.length>0){
        this.listaTareasContrato=data.tareas;
        this.mostrarTareas=true;
      }else{
        this.mostrarTareas=false;
      }
    })
  }

  getTareasContratoTemp(idcontrato:string){
    this.tareasContratoService.getTareasContrato(idcontrato).subscribe((data:any)=>{
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
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea,this.dataSolicitud.contrato.contrato).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

  getTareaDocumentosEntradaTemp(tarea:string) {
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea,this.dataSolicitud.contrato.contrato).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

  refreshTareaDocumentosEntradaSolicitud() {
    this.tareaDocumentoEntradaSolicitud.getTareaDocumentosEntradaSolicitud(this.tokenTemp).subscribe((data:any)=>{
      this.listaTareaDocumentosEntradaSolicitud=data.tarea_documentos_entrada_solicitud;
    })
  }

  refreshTareaDocumentosEntrada(){
    let tarea=this.tareaSelected;
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea,this.dataSolicitud.contrato.contrato).subscribe((data:any)=>{
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
            observacion.value=""
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

    let documentos:any=document.querySelectorAll("[name='iTypeDocFile']")
    
    setTimeout(function(){
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    },500)

    for(let item of documentos){
      if(!item.disabled){
        this.msjNoSucess=true;
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        return
        break;
      }
    }

    let idContrato:string=""
    for(let contrato of this.listaContratos){
      if(contrato.contrato==this.regForm.value.iContrato){
        idContrato=contrato._id
      }
    } 

    this.msjNoSucess=false;

    if (this.regForm.valid) {
      
      solicitud={
        gerencia:this.regForm.value.iGerencia,
        contrato:idContrato,
        tarea:this.regForm.value.iTarea,
        gst:this.regForm.value.iGst,
        bko:this.regForm.value.iBko,
        estado_solicitud:"62fad5ed48d35ca4acd1467d",
        estado_resultado:"62fad65648d35ca4acd14682",
        observacion:this.regForm.value.iMensaje,
        fecha_solicitud:this.regForm.value.iFechaSolicitud,
        fecha_inicio:this.regForm.value.iFechaInicio,
        randomId:this.tokenTemp,
        ingresado:true
      }

      this.solicitudService.updateSolicitud(this.id_solicitud,solicitud).subscribe((data:any)=>{
        this.isSubmitted=false;
        this.regForm.reset();
        this.msjSucess=true;
        this.showModal=true;
        this.tokenTemp=new Date().getTime();
        this.router.navigate(['misSolicitudes'], { });
        
      })

      setTimeout(()=>{
        this.msjSucess=false;
        this.showModal=false;
      },1300)
      
    }
  }

  addSolicitudTemp() {
    let solicitud:any
    this.isSubmitted=true;
    
    
    setTimeout(function(){
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    },500)

    let idContrato:string=""
    for(let contrato of this.listaContratos){
      if(contrato.contrato==this.regForm.value.iContrato){
        idContrato=contrato._id
      }
    } 

    if (this.regForm.dirty && this.regForm.valid) {
      
      solicitud={
        gerencia:this.regForm.value.iGerencia,
        contrato:idContrato,
        tarea:this.regForm.value.iTarea,
        gst:this.regForm.value.iGst,
        bko:this.regForm.value.iBko,
        estado_solicitud:"62fad5db48d35ca4acd1467c",
        estado_resultado:"62fad65648d35ca4acd14682",
        observacion:this.regForm.value.iMensaje,
        fecha_solicitud:this.regForm.value.iFechaSolicitud,
        fecha_inicio:this.regForm.value.iFechaInicio,
        randomId:this.tokenTemp,
        ingresado:false
      }
      this.showModalTemp=true;
      
    }
  }

  addDataSolicitudTemp(){
    let solicitud:any
    let idContrato:string=""
    for(let contrato of this.listaContratos){
      if(contrato.contrato==this.regForm.value.iContrato){
        idContrato=contrato._id
      }
    } 
    solicitud={
      gerencia:this.regForm.value.iGerencia,
      contrato:idContrato,
      tarea:this.regForm.value.iTarea,
      gst:this.regForm.value.iGst,
      bko:this.regForm.value.iBko,
      estado_solicitud:"62fad5db48d35ca4acd1467c",
      estado_resultado:"62fad65648d35ca4acd14682",
      observacion:this.regForm.value.iMensaje,
      fecha_solicitud:this.regForm.value.iFechaSolicitud,
      fecha_inicio:this.regForm.value.iFechaInicio,
      randomId:this.tokenTemp,
      ingresado:false
    }
    this.solicitudService.addSolicitud(solicitud).subscribe((data:any)=>{
      this.isSubmitted=false;
      this.showModalTemp=true;
      this.regForm.reset();
      this.msjSucess=true;
      this.showModal=true;
      this.tokenTemp=new Date().getTime();
      this.router.navigate(['misSolicitudes'], { });
      
    })

    setTimeout(()=>{
      this.msjSucess=false;
      this.showModal=false;
    },1300)
  }

  closeModalTemp() {
    this.showModalTemp=false;
  }

}
