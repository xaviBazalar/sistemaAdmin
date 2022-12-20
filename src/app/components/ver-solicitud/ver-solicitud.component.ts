import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialResultadoSolicitudService } from '../../services/historial-resultado-solicitud.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { TareaDocumentosSalidaService } from '../../services/tarea-documentos-salida.service';
import { environment } from '../../../environments/environment';
import { DocumentacionSolicitudedService } from '../../services/documentacion-solicituded.service';
import { TareaDocumentosEntradaSolicitudService } from '../../services/tarea-documentos-entrada-solicitud.service';
import { UploadFileService } from '../../services/upload-file.service';
import { BitacoraSolicitudService } from '../../services/bitacora-solicitud.service';
import { TareaDocumentosSalidaSolicitudService } from '../../services/tarea-documentos-salida-solicitud.service';
import { GestionSolicitudService } from '../../services/gestion-solicitud.service';
import { UploadGoogleStorageService } from '../../services/upload-google-storage.service';


@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {
  baseUrlGet:string=environment.baseUrlGet;
  solicitud:any;
  listaHistorialResultadoSolicitud:any;
  listaTareaDocumentos:any=[];
  listaTareaDocumentosEntradaSolicitud:any=[];
  listaTareaDocumentosSalidaSolicitud:any=[];
  listaTareaDocumentosSalida:any=[];
  listaDocumentacionSolicitud:any=[];
  listaGestionSolicitud:any=[]
  listaBitacoraSolicitud:any;
  tarea:any;
  loaded:boolean=false;
  id_solicitud:string|null  ="";
  id_historial:string|null = "";
  urlRespuesta:string|null = "";
  urlPregunta:string|null = "";
  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');
  showModal:boolean=false;
  minDay:string=new Date().toISOString().split("T")[0];
  eIteraccion:boolean=false
  constructor(
    public solicitudService:SolicitudesService,
    public historialSolicitudService:HistorialResultadoSolicitudService,
    public tareaDocumentosService:TareaDocumentosEntradaService,
    public tareaDocumentosEntradaSolicitudService:TareaDocumentosEntradaSolicitudService,
    public tareaDocumentoSalidaSolicitud: TareaDocumentosSalidaSolicitudService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService,
    public documentacionSolicitudService:DocumentacionSolicitudedService,
    public uploadFileService: UploadFileService,
    public uploadFileStorageService:UploadGoogleStorageService,
    public bitacoraSolicitudService:BitacoraSolicitudService,
    public gestionSolicitudService:GestionSolicitudService,
    public _route:ActivatedRoute,
    private router: Router) {
      /*if(this.usuario.perfil.sigla!="ADC"){
        this.router.navigate(['solicitudB/'+this._route.snapshot.paramMap.get("id"), { }]);
      }*/

   }

  async ngOnInit(): Promise<void> {
    let idSolicitud:string|null=this._route.snapshot.paramMap.get("id");
    this.id_solicitud=this._route.snapshot.paramMap.get("id");
    const dataSolicitud :any = await this.solicitudService.getSolicitud(idSolicitud).toPromise();
    this.solicitud=dataSolicitud.solicitudes[0];
    this.tarea=dataSolicitud.solicitudes[0]?.tarea._id;
    this.getTareaDocumentosEntradaSolicitud(dataSolicitud.solicitudes[0]?.randomId)
    this.getTareaDocumentosSalidaSolicitud(dataSolicitud.solicitudes[0]?.randomId)
    this.getTareaDocumentosSalida(this.tarea)
    this.getTareaDocumentosEntrada(this.tarea)

    const dataHistoria:any = await this.historialSolicitudService.getHistorialResultadoSolicitud(idSolicitud).toPromise();
    this.listaHistorialResultadoSolicitud=dataHistoria.historial_resultado_solicitud;

    const dataDocumentacion:any = await this.documentacionSolicitudService.getDocumentacionSolicitud(this.tarea,this.solicitud.contrato._id,1,"").toPromise();
    this.listaDocumentacionSolicitud=dataDocumentacion.documentacion_solicitudes.docs;
    this.loaded=true;

    const dataBitacora:any = await this.bitacoraSolicitudService.getBitacoraSolicitud(idSolicitud).toPromise();
    this.listaBitacoraSolicitud=dataBitacora.bitacora_solicitud

    /*const dataDocumentoSalidaSolicitud:any = await this.tareaDocumentoSalidaSolicitud.getTareaDocumentosSalidaSolicitud("").toPromise();
    this.listaTareaDocumentosSalidaSolicitud=dataDocumentoSalidaSolicitud.tarea_documentos_salida_solicitud;
    console.log(this.listaTareaDocumentosSalidaSolicitud)*/
    const dataGestionSolicitud:any = await this.gestionSolicitudService.getGestionSolicitud(this.id_solicitud).toPromise();
    this.listaGestionSolicitud=dataGestionSolicitud.gestion_solicitud

    
  }

  refreshBitacoraSolicitud(){
    this.bitacoraSolicitudService.getBitacoraSolicitud(this.id_solicitud).subscribe((data:any)=>{
      this.listaBitacoraSolicitud=data.bitacora_solicitud
    })
  }

  addFileHistorial(){
    var formData = new FormData();
    const docfile = document.querySelector('#fileRespuesta') as HTMLInputElement;
    const docProd=docfile.files instanceof FileList
    ? docfile.files[0] : ''
    formData.append("archivo", docProd);

    this.uploadFileService.addFileToApp(formData).subscribe((data:any)=>{
    //this.uploadFileStorageService.addFileToStorage(formData).subscribe((data:any)=>{
      //if(data.validation){
        this.urlRespuesta=data.urlFile
      //}
    })
  }

  addFileHistorialPregunta(){
    var formData = new FormData();
    const docfile = document.querySelector('#filePregunta') as HTMLInputElement;
    const docProd=docfile.files instanceof FileList
    ? docfile.files[0] : ''
    formData.append("archivo", docProd);

    this.uploadFileService.addFileToApp(formData).subscribe((data:any)=>{
    //this.uploadFileStorageService.addFileToStorage(formData).subscribe((data:any)=>{
        //if(data.validation){
          this.urlPregunta=data.urlFile
        //}
    })
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

  getDescripcionDocumentoSalida(idTareaDocumento:string){
    let data=""
    for(let item of this.listaTareaDocumentosSalida){
      if(item._id==idTareaDocumento){
        data=item.documento_salida.descripcion
        break
      }
    }
    return data;
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

  getTypeDocumentoSalida(idTareaDocumento:string){
    let data=""
    for(let item of this.listaTareaDocumentosSalida){

      if(item._id==idTareaDocumento){
        data=item.documento_salida.tipo_documento
        break
      }
    }
    return data;
  }

  validateUrl(url:string){
    if(url.indexOf("http")>-1){
      return url
    }else{
      return this.baseUrlGet+url
    }
  }

  getTareaDocumentosEntrada(tarea:string) {
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea,this.solicitud.contrato._id,1,0).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

  getTareaDocumentosEntradaSolicitud(tarea:string) {
    this.tareaDocumentosEntradaSolicitudService.getTareaDocumentosEntradaSolicitud(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentosEntradaSolicitud=data.tarea_documentos_entrada_solicitud;
      
    })
  }

  getTareaDocumentosSalidaSolicitud(tarea:string) {
    this.tareaDocumentoSalidaSolicitud.getTareaDocumentosSalidaSolicitud(this.solicitud.randomId).subscribe((data:any)=>{
      this.listaTareaDocumentosSalidaSolicitud=data.tarea_documentos_salida_solicitud;
      
    })
  }

  getTareaDocumentosSalida(tarea:string) {
    this.tareaDocumentosSalidaService.getTareaDocumentosSalida(tarea,this.solicitud.contrato._id,1,"").subscribe((data:any)=>{
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida;
    })
  }

  addHistorialSolicitud(){
    let mensaje:any=document.querySelector("#msjInteradcion")
    let usuario:any | null= JSON.parse(localStorage.getItem("usuario") || '{}');
    let dataHistorial:any={
      "solicitud": this.id_solicitud,
      "estado_resultado":this.solicitud.estado_resultado._id,
      "usuario": usuario._id,
      "mensaje": mensaje.value,
      "usuario_asignado":this.solicitud.gst._id,
      "solicitante":this.usuario._id,
      "url_file_pregunta":(this.urlRespuesta!="")?"/api/upload?id="+this.urlRespuesta:((this.urlPregunta!="")?"/api/upload?id="+this.urlPregunta:""),
    }

    this.historialSolicitudService.addHistorialResultadoSolicitud(dataHistorial).subscribe((data:any)=>{
      this.refreshHistorialSolicitud()
      mensaje.value=""
      this.urlPregunta=""
      this.eIteraccion=true
    })

    this.refreshBitacoraSolicitud()
    
  }

  refreshHistorialSolicitud(){
    this.historialSolicitudService.getHistorialResultadoSolicitud(this.id_solicitud).subscribe((data:any)=>{
      this.listaHistorialResultadoSolicitud=data.historial_resultado_solicitud;
      this.refreshBitacoraSolicitud()
    });
  }

  validarDocumento(valor:any){
    return valor
  }

  openModalFeedback(idHistorial:string){
    this.showModal=true;
    this.id_historial=idHistorial
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
      url_file:(this.urlRespuesta!="")?"/api/upload?id="+this.urlRespuesta:((this.urlPregunta!="")?"/api/upload?id="+this.urlPregunta:""),

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

  closeModal(){
    this.showModal=false;
    let msg:any=document.querySelector("#feedback")
    msg.value=""
    this.id_historial=""
    this.urlRespuesta=""
  }

}
