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
import { Router } from '@angular/router';
import { ContratosGerenciaService } from '../../services/contratos-gerencia.service';
import { UploadGoogleStorageService } from '../../services/upload-google-storage.service';

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
  contratoTemp:string|null=""
  diasSLA:string=""
  constructor(
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
    public uploadFileStorageService:UploadGoogleStorageService,
    public contratosGerenciaService:ContratosGerenciaService,
    private router: Router,
    public formBuilder: FormBuilder) {
    this.listaUsuariosGST=[];
    this.listaUsuariosBKO=[];
    let dataUser:any=localStorage.getItem("usuario")
    this.usuarioLogin=JSON.parse(dataUser)
    
   }

  ngOnInit(): void {
    this.regFormFile=this.formBuilder.group({
      iFile:[''],
      //iTypeDocFile:['', Validators.required],
    })

    this.tokenTemp=new Date().getTime();

    this.regForm=this.formBuilder.group({
      iGerencia:['', Validators.required],
      iContrato:['', Validators.required],
      iTarea:['', Validators.required],
      iGst:['', Validators.required],
      iBko:['', Validators.required],
      iMensaje:['', Validators.required],
      iFechaSolicitud:[this.getFecActual(), Validators.required],
      //iEstadoSolicitud:['', Validators.required],
      iFechaInicio:[this.getFecEntrega(), Validators.required],
     })

     //this.regForm.controls['iGst'].setValue(this.default, {onlySelf: true});
    this.gerenciaService.getGerenciasActivas().subscribe((data:any)=>{
      this.listaGerencias=data.gerencias;
    })

    this.estadosService.getSolicitudes().subscribe((data:any)=>{
      this.listaSolicitudes=data.estadoSolicitudes;
    })


    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      this.listaUsuarios=data.usuarios;
      for (const usuario of data.usuarios) {
        if((usuario.perfil.sigla=="GST" || usuario.perfil.sigla=="GST-SUP" || usuario.perfil.sigla=="GST-ADM") && usuario.estado ){
          //if(this.usuarioLogin._id!=usuario._id){
            this.listaUsuariosGST.push(usuario)
          //}
        }

        if(usuario.perfil.sigla=="BKO" && usuario.estado){
          this.listaUsuariosBKO.push(usuario)
        }
      }
    })

    this.tareasServicio.getTareas(1,"").subscribe((data:any)=>{
      this.listatareas=data.tareas;
     
    })

   /* this.contratosServicio.getContratos().subscribe((data:any)=>{
      this.listaContratos=data.contratos;
     
    })*/


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
    let contratoTxt=target.value;
    
    let idContrato:string=""
    for(let contrato of this.listaContratos){
      
      let nTemp=contrato.contrato.contrato+"-"+contrato.contrato.contradoid//+"-"+contrato.contrato.adc.nombre
      if((nTemp.trim())==contratoTxt.trim()){
        idContrato=contrato.contrato._id
        this.contratoTemp=contrato.contrato._id
        //console.log("match")
      }
    } 

    this.tareasContratoService.getTareasContrato(1,idContrato).subscribe((data:any)=>{
      if(data.contratos.docs.length>0 ){
        //this.listaTareasContrato=data.contratos;
        this.listaTareasContrato=[]
        for (const contrato of data.contratos.docs) {
          if(contrato.estado==true || contrato.estado==1){
            this.listaTareasContrato.push(contrato)
          }
        }
        this.mostrarTareas=true;
      }else{
        this.mostrarTareas=false;
      }
    })
  }

  
  getContratosGerencia({ target }:any){
    let gerencia=target.value;
    let contrato:any=document.querySelector("#iContrato")
    this.contratosGerenciaService.getContratosGerenciaActivos(gerencia,0).subscribe((data:any)=>{

      this.listaContratos=data.contratos_gerencia
      contrato.value=""
    });
  }

  getTareaDocumentosEntrada({ target }:any) {
    
    for (const info of this.listaTareasContrato) {
      if(info.tarea._id==target.value){
        this.diasSLA=info.tarea.SLA+" días"
        this.regForm.controls['iGst'].setValue(info.gst._id);
        this.regForm.controls['iBko'].setValue(info.bko._id);
        break
      }
    }

    this.tareaSelected=target.value
    let tarea=target.value;
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea,this.contratoTemp,1,0).subscribe((data:any)=>{
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
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea,this.contratoTemp,1,0).subscribe((data:any)=>{
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
    let previewFile:any=document.querySelector("#customFileLang")
    previewFile.readOnly=true
    if(this.tipoTareaSelected=="word"){
      inputF?.setAttribute("accept",".doc,.docx")
    }

    if(this.tipoTareaSelected=="pdf+doc"){
      inputF?.setAttribute("accept",".doc,.docx,.pdf")
    }

    if(this.tipoTareaSelected=="excel"){
      inputF?.setAttribute("accept",".xls,.xlsx")
    }

    if(this.tipoTareaSelected=="pdf"){
      inputF?.setAttribute("accept",".pdf")
    }

    if(this.tipoTareaSelected=="txt"){
      inputF?.setAttribute("accept",".txt")
    }

    if(this.tipoTareaSelected=="zip"){
      inputF?.setAttribute("accept",".zip,.rar,.tar")
    }

    if(this.tipoTareaSelected=="url"){
      inputF?.setAttribute("accept","")
      previewFile?.removeAttribute("readonly")
    }
    previewFile.value=""

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
    if (this.idTareDocumentoEntrada!="") {
        if(previewFile.value.indexOf("http")>-1){
          let dataAdd={
            tarea_documento:this.idTareDocumentoEntrada,
            validado:true,
            url_ref:previewFile.value,
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
        }else{
          this.uploadFileService.addFileToApp(formData).subscribe((data:any)=>{
          //this.uploadFileStorageService.addFileToStorage(formData).subscribe((data:any)=>{ // Service para cargar en google storage
  
            let dataAdd={
              tarea_documento:this.idTareDocumentoEntrada,
              validado:true,
              url_ref:data.urlFile,
              observacion:observacion.value,
              randomId:this.tokenTemp
            } 

            //https://storage.googleapis.com/download/storage/v1/b/project-mining/o/Carnet%20(1).pdf?generation=1669402313620023&alt=media

            //if(data.validation){
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
            //}
  
  
          })
        }
        
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
      if(contrato.contrato.contrato){//+"-"+contrato.contrato.adc.nombre
        if((contrato.contrato.contrato+"-"+contrato.contrato.contradoid)==this.regForm.value.iContrato){
        //if(contrato.contrato==this.regForm.value.iContrato){
          idContrato=contrato.contrato._id
        }
      }
    } 

    this.msjNoSucess=false;

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
        ingresado:true,
        solicitante:this.usuarioLogin._id,
        sla:this.diasSLA
      }


      

      this.solicitudService.addSolicitud(solicitud).subscribe((data:any)=>{
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
      let nTemp:any=this.regForm.value.iContrato
      let contrato_text:any=(contrato.contrato.contrato+"-"+contrato.contrato.contradoid)
      if(contrato_text.trim()==nTemp.trim()){
        idContrato=contrato.contrato._id
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
        ingresado:false,
        solicitante:this.usuarioLogin._id
      }
      this.showModalTemp=true;
      
    }
  }

  addDataSolicitudTemp(){
    let solicitud:any
    let idContrato:string=""
    for(let contrato of this.listaContratos){
      let nTemp:any=this.regForm.value.iContrato
      let contrato_text:any=(contrato.contrato.contrato+"-"+contrato.contrato.contradoid)

      if(contrato_text.trim()==nTemp.trim()){
        idContrato=contrato.contrato._id
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
      ingresado:false,
      solicitante:this.usuarioLogin._id
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
