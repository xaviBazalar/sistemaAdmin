import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.css']
})
export class DashboardGeneralComponent implements OnInit {

  listaCargaDeTrabajo:any=[]
  listaTareas:any=[]
  listaSolicitudesTerminadasTiempo:any=[]
  listaTareasTerminadas:any=[]

  constructor(public dashboardService:DashboardService,
    public translate:TranslateService) { 
    
  }

  async ngOnInit(): Promise<void> {
    
    let lbl_news_tasks:string= await this.translate.get('label.dashboard.news_tasks').toPromise()

    let diaLunes:any = new Date();
    let diaMartes:any = new Date();
    let diaMiercoles:any = new Date();
    let diaJueves:any = new Date();
    let diaViernes:any = new Date();
    let diaSabado:any = new Date();
    let diaDomingo:any = new Date();
    let hoyWithFormat:string=this.getDateNow();

    const numeroDia = new Date(hoyWithFormat).getDay();
    let desdeIni:string=""
    let hastaFin:string=""
    for(let i=0;i<=6;++i){
      if(i==0){
        let flag=(numeroDia-i)
        diaLunes.setTime(diaLunes.getTime() - (flag*24*60*60*1000))
        desdeIni=this.formatDate(diaLunes)
      }

      if(i==1){
        let flag=(numeroDia-i)
        diaMartes.setTime(diaMartes.getTime() - (flag*24*60*60*1000))
      }

      if(i==2){
        let flag=(numeroDia-i)
        if(flag!=0){
          diaMiercoles.setTime(diaMiercoles.getTime() - (flag*24*60*60*1000))
        }
      }

      if(i==3){
        let flag=(numeroDia-i)
        if(flag!=0){
          diaJueves.setTime(diaJueves.getTime() - (flag*24*60*60*1000))
        }
      }

      if(i==4){
        let flag=(numeroDia-i)
        if(flag!=0){
          diaViernes.setTime(diaViernes.getTime() - (flag*24*60*60*1000))
        }
      }

      if(i==5){
        let flag=(numeroDia-i)
        if(flag!=0){
          diaSabado.setTime(diaSabado.getTime() - (flag*24*60*60*1000))
        }
      }

      if(i==6){
        let flag=(numeroDia-i)
        if(flag!=0){
          diaDomingo.setTime(diaDomingo.getTime() - (flag*24*60*60*1000))
        }

        hastaFin=this.formatDate(diaDomingo)
      }

    }
    this.chartSolicitudesNuevas(desdeIni,hastaFin,lbl_news_tasks)
  }

  filterDashboard(){
    let desdeIni:any=document.querySelector("#fecIni")
    let hastaFin:any=document.querySelector("#fecFin")
    this.chartSolicitudesNuevas(desdeIni.value,hastaFin.value)
  }

  

  getDateNow(){
    let hoy:any = new Date();
   
    let mes:any=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia:any=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;

    let hoyWithFormat:string=hoy.getFullYear()+"-"+mes+"-"+dia

    return hoyWithFormat;
  }

 
  async chartSolicitudesNuevas(desde:string,hasta:string,lbl_news_tasks:string="-"){
    let lbl_workload_for_taks:string= await this.translate.get('label.dashboard.workload_for_taks').toPromise()
    let lbl_task_per_assigned_person:string= await this.translate.get('label.dashboard.task_per_assigned_person').toPromise()
    let dataExtra="fec_desde="+desde+"&fec_hasta="+hasta+"&hoy="+this.getDateNow()
    this.dashboardService.getCargaDeTrabajoMasVencidos(dataExtra).subscribe((data:any)=>{
      this.listaTareasTerminadas=[]
      for(let solicitudT of data.solicitudes_terminadas_tiempo){
        let fecA:any=new Date(solicitudT.fecha_inicio)
        let fecB:any=new Date(solicitudT.fecha_termino)
        let resta = fecB.getTime() - fecA.getTime()
        let dias_termino_real:any=Math.round(resta/ (1000*60*60*24))
        this.listaTareasTerminadas.push({
          nro:solicitudT.idsecuencia,
          nombre:solicitudT.tarea.nombre_tarea,
          fecha_inicio:solicitudT.fecha_inicio,
          fecha_termino:solicitudT.fecha_termino,
          sla:solicitudT.tarea.SLA,
          tiempo:dias_termino_real,
          t_sla:dias_termino_real/parseInt(solicitudT.tarea.SLA)
        })
      }


      let dataShowIngresosTitle:any=[]
      let dataShowIngresosTotal:any=[]
      for(let info of data.solicitudes_nuevas_semana){
        dataShowIngresosTitle.push(info._id.fecha_solicitud)
        dataShowIngresosTotal.push(info.total)
      }

      // @ts-ignore
      Highcharts.chart("container-nuevas-solicitudes", {
        colors:['#83b860'],
        chart: {
          type: "column",
          zoomType: "y"
        },
        title: {
          text: lbl_news_tasks
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: dataShowIngresosTitle,
          title: {
            text: null
          },
          accessibility: {
            description: "Countries"
          }
        },
        yAxis: {
          min: 0,
          tickInterval: 2,
          title: {
            text: `Ingresos del ${desde} al ${hasta}`
          },
          labels: {
            overflow: "justify",
            format: "{value}"
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
              format: "{y}",
              
            }
          }
          
        },
        tooltip: {
          valueSuffix: " Ingreso(s)",
          stickOnContact: true,
          backgroundColor: "#fff"
        },
        legend: {
          enabled: false
        },
        series: [
          {
            name: "",
            data: dataShowIngresosTotal,
            borderColor: "#83b860",
            
          }
        ]
      });


      let dataShowTareas:any=[]
      for(let info of data.carga_trabajo_total){
        dataShowTareas.push({
          name:info._id.estado_solicitud,
          y:info.total
        })
      }

      this.listaTareas=dataShowTareas


      let dataShowPersonas:any=[]
      for(let info of data.tareas_por_persona){
        dataShowPersonas.push({
          name:info._id.nombre,
          y:info.total
        })
      }

      // @ts-ignore
      Highcharts.chart('container-chart', {
        colors: ['#e99e7f', '#f7c973', '#dafafe', '#9dcacf' ],
        chart: {
          type: 'pie'
        },
        title: {
          text: lbl_workload_for_taks
        },
        tooltip: {
          valueSuffix: '%'
        },
        /*subtitle: {
          text:
          'Subtitle'
        },*/
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y}'//{point.name}: {point.percentage:.1f}%
            },
            showInLegend: true
          }
        },
        series: [
          {
            name: 'Percentage',
            colorByPoint: true,
            data: dataShowTareas
          }
        ]
      });

       // @ts-ignore
       Highcharts.chart('container-chart-persona', {
        colors: ['#334ca9', '#4d9ba7', '#a52654', '#6a29a2', '#f201ba'],
        chart: {
          type: 'pie'
        },
        title: {
          text: lbl_task_per_assigned_person
        },
        tooltip: {
          valueSuffix: '%'
        },
        /*subtitle: {
          text:
          'Subtitle'
        },*/
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y}'
            },
            showInLegend: true
          }
        },
        series: [
          {
            name: 'Percentage',
            colorByPoint: true,
            data: dataShowPersonas
          }
        ]
      });
    })

    
  }

  formatDate(date:any){
    let mes:any=((date.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia:any=date.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;
    let dateWithFormat:string=date.getFullYear()+"-"+mes+"-"+dia
    return dateWithFormat;
  }

}
