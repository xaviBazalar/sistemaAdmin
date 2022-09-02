import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { HistorialResultadoSolicitudService } from '../../services/historial-resultado-solicitud.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';
import { environment } from '../../../environments/environment';
import { UploadFileService } from '../../services/upload-file.service';
import { BitacoraSolicitudService } from '../../services/bitacora-solicitud.service';
import { DocumentacionSolicitudedService } from '../../services/documentacion-solicituded.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TareaDocumentosSalidaService } from '../../services/tarea-documentos-salida.service';
import { EstadoResultadoService } from '../../services/estado-resultado.service';
import { TareaDocumentosSalidaSolicitudService } from '../../services/tarea-documentos-salida-solicitud.service';
import { TareaDocumentosEntradaSolicitudService } from '../../services/tarea-documentos-entrada-solicitud.service';
import { GestionSolicitudService } from '../../services/gestion-solicitud.service';

@Component({
  selector: 'app-ver-solicitud-gst',
  templateUrl: './ver-solicitud-gst.component.html',
  styleUrls: ['./ver-solicitud-gst.component.css']
})
export class VerSolicitudGstComponent implements OnInit {
  baseUrlGet:string=environment.baseUrlGet;
  solicitud:any;
  listaHistorialResultadoSolicitud:any;
  listaTareaDocumentos:any=[];
  listEstadosResultado:any=[];
  tarea:any;
  loaded:boolean=false;
  listaUsuarios:any;
  listaTareaDocumentosEntradaSolicitud:any;
  listaTareaDocumentosSalidaSolicitud:any=[];
  listaUsuariosGST:any=[];
  listaUsuariosBKO:any=[];
  listaSolicitudes:any;
  listaBitacoraSolicitud:any;
  listaDocumentacionSolicitud:any=[]
  listaTareaDocumentosSalida:any
  listaGestionSolicitud:any=[];
  controlGS:boolean=false
  controlDR:boolean=false
  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(sessionStorage.getItem("usuario") || '{}');
  showModal:boolean=false;
  id_historial:string|null = "";
  id_solicitud:string|null  ="";
  urlRespuesta:string|null  ="";
  isSubmittedFile:boolean=false;
  regFormFile:any;
  idTareDocumentoRespuesta:string|null  ="";
  tokenTemp:any="";
  tipoTareaSelected:number|string="";
  constructor(
    public solicitudService:SolicitudesService,
    public historialSolicitudService:HistorialResultadoSolicitudService,
    public tareaDocumentosService:TareaDocumentosEntradaService,
    public usuariosService:UsuariosService,
    public estadosService:EstadosSolicitudService,
    public estadoResultadoService:EstadoResultadoService,
    public uploadFileService:UploadFileService,
    public bitacoraSolicitudService:BitacoraSolicitudService,
    public documentacionSolicitudService:DocumentacionSolicitudedService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService,
    public tareaDocumentoSalidaSolicitud: TareaDocumentosSalidaSolicitudService,
    public tareaDocumentosEntradaSolicitudService: TareaDocumentosEntradaSolicitudService,
    public gestionSolicitudService:GestionSolicitudService,
    public _route:ActivatedRoute,
    public formBuilder: FormBuilder) {
      this.regFormFile=this.formBuilder.group({
        iFile:['', Validators.required],
        //iTypeDocFile:['', Validators.required],
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

      this.estadosService.getSolicitudes().subscribe((data:any)=>{
        this.listaSolicitudes=data.estadoSolicitudes;
      })
   }

  async ngOnInit(): Promise<void> {
    this.tokenTemp=this._route.snapshot.paramMap.get("id");
    let idSolicitud:string|null=this._route.snapshot.paramMap.get("id");
    this.id_solicitud=this._route.snapshot.paramMap.get("id");
    const dataSolicitud :any = await this.solicitudService.getSolicitud(idSolicitud).toPromise();
    this.solicitud=dataSolicitud.solicitudes[0];
    this.tarea=dataSolicitud.solicitudes[0]?.tarea._id;
    this.getTareaDocumentosEntrada(this.tarea)
    this.getTareaDocumentosSalida(this.tarea)
    this.getTareaDocumentosEntradaSolicitud(dataSolicitud.solicitudes[0]?.randomId)
    const dataHistoria:any = await this.historialSolicitudService.getHistorialResultadoSolicitud(idSolicitud).toPromise();
    this.listaHistorialResultadoSolicitud=dataHistoria.historial_resultado_solicitud;
    this.loaded=true;

    const dataEstadoResultado:any = await this.estadoResultadoService.getSolicitudes().toPromise();
    this.listEstadosResultado=dataEstadoResultado.estadoResultados
    const dataDocumentacion:any = await this.documentacionSolicitudService.getDocumentacionSolicitud(this.tarea).toPromise();
    this.listaDocumentacionSolicitud=dataDocumentacion.documentacion_solicitudes;

    const dataBitacora:any = await this.bitacoraSolicitudService.getBitacoraSolicitud(idSolicitud).toPromise();
    this.listaBitacoraSolicitud=dataBitacora.bitacora_solicitud

    const dataDocumentoSalidaSolicitud:any = await this.tareaDocumentoSalidaSolicitud.getTareaDocumentosSalidaSolicitud("").toPromise();
    this.listaTareaDocumentosSalidaSolicitud=dataDocumentoSalidaSolicitud.tarea_documentos_salida_solicitud;

    const dataGestionSolicitud:any = await this.gestionSolicitudService.getGestionSolicitud(this.id_solicitud).toPromise();
    this.listaGestionSolicitud=dataGestionSolicitud.gestion_solicitud
    
    
  }

  validateGs(color:string,id:string){
    //console.log(color+"-"+id)
    /*let estado:any=document.querySelector("#estado-"+id)
    for(let item of this.listaDocumentacionSolicitud){
      if(item._id==id){
        let img:any=document.querySelector("#img-"+id)
        console.log(estado.value)
      }
    }*/
    return false;
  }


//check- estado- obs-
  validarImg(obj:string){
    let estado:any=document.querySelector("#estado-"+obj)
    if(estado.value==""){
      let color:any=document.querySelector("#amarillo-"+obj)
      color.style.display='none'
      let color_b:any=document.querySelector("#rojo-"+obj)
      color_b.style.display='none'
      let color_c:any=document.querySelector("#verde-"+obj)
      color_c.style.display='none'
      return;
    }

    for(let item of this.listaDocumentacionSolicitud){
      
      if(item._id==obj){
        
        if(estado.value=="No Aplica"){
          let color:any=document.querySelector("#amarillo-"+obj)

          let color_b:any=document.querySelector("#rojo-"+obj)
          color_b.style.display='none'
          let color_c:any=document.querySelector("#verde-"+obj)
          color_c.style.display='none'

          color.style.display = 'block'
        }
    
        if(estado.value=="No Cumple"){
          let color:any=document.querySelector("#rojo-"+obj)

          let color_b:any=document.querySelector("#amarillo-"+obj)
          color_b.style.display='none'
          let color_c:any=document.querySelector("#verde-"+obj)
          color_c.style.display='none'

          color.style.display = 'block'
        }
    
        if(estado.value=="Cumple"){
          let color:any=document.querySelector("#verde-"+obj)

          let color_b:any=document.querySelector("#amarillo-"+obj)
          color_b.style.display='none'
          let color_c:any=document.querySelector("#rojo-"+obj)
          color_c.style.display='none'

          color.style.display = 'block'
        }
      }else{
        /*let color:any=document.querySelector("#amarillo-"+obj)
        color.style.display='none'
        let color_b:any=document.querySelector("#rojo-"+obj)
        color_b.style.display='none'
        let color_c:any=document.querySelector("#verde-"+obj)
        color_c.style.display='none'*/
      }
      
    }
    return false;
    /*if(estado.value=="Aplica"){

    }

    if(estado.value=="No Cumple"){
      
    }

    if(estado.value=="Cumple"){
      
    }*/
  }

  saveGestionSolicitud(){
    if(this.listaGestionSolicitud.length==0 && this.controlGS==false){
      for(let item of this.listaDocumentacionSolicitud){
        var id=item._id
        var iCheck:any=document.querySelector("#check-"+item._id)
        var iEstado:any=document.querySelector("#estado-"+item._id)
        var iObs:any=document.querySelector("#obs-"+item._id)
        var dataGS={
          _id:id,
          solicitud:this.id_solicitud,
          documentacion_solicitud:item._id,
          validado:iCheck.checked,
          estado:iEstado.value,
          observacion:iObs.value,
          solicitante:this.usuario._id
        }
        this.gestionSolicitudService.addGestionSolicitud(dataGS).subscribe((data:any)=>{
          //console.log(data)
          this.controlGS=true;
        })
        
      }
      
    }else{
      for(let item of this.listaGestionSolicitud){
        if(this.controlGS==false){
          var id=item._id
          var iCheck:any=document.querySelector("#check-"+item.documentacion_solicitud._id)
          var iEstado:any=document.querySelector("#estado-"+item.documentacion_solicitud._id)
          var iObs:any=document.querySelector("#obs-"+item.documentacion_solicitud._id)
          var dataGS={
            _id:id,
            solicitud:this.id_solicitud,
            documentacion_solicitud:item.documentacion_solicitud._id,
            validado:iCheck.checked,
            estado:iEstado.value,
            observacion:iObs.value,
            solicitante:this.usuario._id
          }
          this.gestionSolicitudService.updateGestionSolicitud(id,dataGS).subscribe((data:any)=>{
            //console.log(data)
            this.controlGS=true;
          })
        }
        
      }
      
    }
    

    
  }

  validarBko(id:string){
    if (id==this.solicitud.bko._id){
      return true
    }else{
      return false
    }
  }

  validarGst(id:string){
    if (id==this.solicitud.gst._id){
      return true
    }else{
      return false
    }
  }

  getDescripcionDocumentoEntrada(idTareaDocumento:string){
    let data=""
    for(let item of this.listaTareaDocumentos){
      if(item._id==idTareaDocumento){
        data=item.documento_entrada.descripcion
        break
      }
    }
    return data;
  }

  getTareaDocumentosEntradaSolicitud(tarea:string) {
    this.tareaDocumentosEntradaSolicitudService.getTareaDocumentosEntradaSolicitud(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentosEntradaSolicitud=data.tarea_documentos_entrada_solicitud;
      
    })
  }

  get errorControlFile() {
    return this.regFormFile.controls;
  }

  getTypeDocumentoEntrada(idTareaDocumento:string){
    let data=""
    for(let item of this.listaTareaDocumentos){

      if(item._id==idTareaDocumento){
        data=item.documento_entrada.tipo_documento
        break
      }
    }
    return data;
  }

  refreshBitacoraSolicitud(){
    this.bitacoraSolicitudService.getBitacoraSolicitud(this.id_solicitud).subscribe((data:any)=>{
      this.listaBitacoraSolicitud=data.bitacora_solicitud
    })
  }

  validarEstado(estado:string,estado_validacion:string){
    if(estado==estado_validacion){
      return true
    }else{
      return false
    }
  }

  validarEstadoResultado(estado:string){
    if(this.solicitud.estado_resultado!==undefined ){
      if(estado==this.solicitud.estado_resultado._id){
        return true
      }else{
        return false
      }
    }else{
      return false
    }

  }


  getTareaDocumentosEntrada(tarea:string) {
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

  openModalFeedback(idHistorial:string){
    this.showModal=true;
    this.id_historial=idHistorial
  }

  addHistorialSolicitud(){
    let mensaje:any=document.querySelector("#msjInteradcion")
    let usuario:any | null= JSON.parse(sessionStorage.getItem("usuario") || '{}');
    let dataHistorial:any={
      "solicitud": this.id_solicitud,
      "estado_resultado":this.solicitud.estado_resultado._id,
      "usuario": usuario._id,
      "mensaje": mensaje.value,
      solicitante:this.usuario._id
    }

    this.historialSolicitudService.addHistorialResultadoSolicitud(dataHistorial).subscribe((data:any)=>{
      this.refreshHistorialSolicitud()
      this.refreshBitacoraSolicitud()
      mensaje.value=""
    })
    
  }

  refreshHistorialSolicitud(){
    this.historialSolicitudService.getHistorialResultadoSolicitud(this.id_solicitud).subscribe((data:any)=>{
      this.listaHistorialResultadoSolicitud=data.historial_resultado_solicitud;
      this.refreshBitacoraSolicitud()
    });
  }

  addFileHistorial(){
    var formData = new FormData();
    const docfile = document.querySelector('#fileRespuesta') as HTMLInputElement;
    const docProd=docfile.files instanceof FileList
    ? docfile.files[0] : ''
    formData.append("archivo", docProd);

    this.uploadFileService.addFileToApp(formData).subscribe((data:any)=>{
      this.urlRespuesta=data.urlFile
    })
  }

  getFecRegistro=()=>{
    var today = new Date();
    var now = today.toLocaleString();
    let fecToday=now.split(",")
    let fecActual:any=fecToday[0].split("/")
    let mes=(fecActual[0].length==1)?"0"+fecActual[0]:fecActual[0];
    let dia=(fecActual[1].length==1)?"0"+fecActual[1]:fecActual[1];
    fecActual=fecActual[2]+"-"+mes+"-"+dia
    return fecActual+" "+fecToday[1]
 }

  updateHistorialSolicitud(){
    let msg:any=document.querySelector("#feedback")
    let id:any=this.id_historial;
    let dataHistorial:any={
      _id:this.id_historial,
      respuesta:msg.value,
      fecha_respuesta:this.getFecRegistro(),
      usuario_respuesta:this.usuario._id,
      url_file:(this.urlRespuesta!="")?"/api/upload?id="+this.urlRespuesta:"",
      solicitante:this.usuario._id
    }
    this.historialSolicitudService.updateHistorialResultadoSolicitud(dataHistorial,id).subscribe((data:any)=>{

      this.refreshHistorialSolicitud()
      msg.value=""
      this.id_historial=""
      this.showModal=false;
      this.urlRespuesta=""
      this.refreshBitacoraSolicitud()
    });
  }

  updateSolicitud(action:string){
    let estado_solicitud:any=document.querySelector("#iEstadoSolicitud")
    let estado_resultado:any=document.querySelector("#iEstadoResultado")
    let fecha_inicio:any=document.querySelector("#iFechaInicio")
    let fecha_solicitud:any=document.querySelector("#iFechaSolicitud")
    let gst:any=document.querySelector("#iGst")
    let bko:any=document.querySelector("#iBko")

    if(action=="estado_solicitud"){
      let dataSolicitud:any={
        _id:this.id_solicitud,
        estado_solicitud:estado_solicitud.value,
        fecha_inicio:fecha_inicio.value,
        fecha_solicitud:fecha_solicitud.value,
        gst:gst.value,
        bko:bko.value,
        solicitante:this.usuario._id
      }
      this.solicitudService.updateSolicitud(this.id_solicitud,dataSolicitud).subscribe((data:any)=>{
        //console.log(data)
        this.refreshBitacoraSolicitud()
      });
    }else{
      if(this.controlDR==false){
        let dataSolicitud:any={
          _id:this.id_solicitud,
          estado_resultado:estado_resultado.value,
          solicitante:this.usuario._id
        }
        this.solicitudService.updateSolicitud(this.id_solicitud,dataSolicitud).subscribe((data:any)=>{
          //console.log(data)
          this.controlDR=true
          this.refreshBitacoraSolicitud()
        });
      }
    }
  }

  closeModal(){
    this.showModal=false;
    let msg:any=document.querySelector("#feedback")
    msg.value=""
    this.id_historial=""
    this.urlRespuesta=""
  }

  validarDocumento(valor:any){
    return valor
  }

  selectedGS(a:string,b:string){
    if(a==b){
      return true
    }else{
      return false
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
    if (this.regFormFile.dirty && this.regFormFile.valid && this.idTareDocumentoRespuesta!="") {
        this.uploadFileService.addFileToApp(formData).subscribe((data:any)=>{

          let dataAdd={
            tarea_documento:this.idTareDocumentoRespuesta,
            validado:true,
            url_ref:"/api/upload?id="+data.urlFile,
            observacion:observacion.value,
            randomId:this.tokenTemp
          } 

          this.tareaDocumentoSalidaSolicitud.addTareaDocumentosSalidaSolicitud(dataAdd).subscribe((data:any)=>{
            //this.refreshTareaDocumentosEntrada()
            this.refreshTareaDocumentosSalidaSolicitud()
            this.isSubmittedFile=false
            this.regFormFile.reset()
            this.idTareDocumentoRespuesta=""
            previewFile.value=""
            this.isSubmittedFile=false;
         })

        })
    }
  }

  refreshTareaDocumentosSalidaSolicitud() {
    this.tareaDocumentoSalidaSolicitud.getTareaDocumentosSalidaSolicitud("").subscribe((data:any)=>{
      this.listaTareaDocumentosSalidaSolicitud=data.tarea_documentos_salida_solicitud;
    })
  }

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

  validateTareDocumentoSolicitud(id:string){
    let validacion=false
    for(let tareDocumentoSalida of this.listaTareaDocumentosSalidaSolicitud){
      if(tareDocumentoSalida.tarea_documento._id==id && tareDocumentoSalida.randomId==this.tokenTemp){
        validacion=true
        break
      }
      
    }

    return validacion
  }

  saveTypeDocFile(valor:string,tipoArchivo:string){
    this.idTareDocumentoRespuesta=valor;
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

  getTareaDocumentosSalida(tarea:string) {
    this.tareaDocumentosSalidaService.getTareaDocumentosSalida(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida;
    })
  }
}
