import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.css']
})
export class DashboardGeneralComponent implements OnInit {

  listaCargaDeTrabajo:any=[]
  listaTareas:any=[]

  constructor(public dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getCargaDeTrabajoMasVencidos().subscribe((data:any)=>{
      
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
          text: 'Carga de trabajo por tarea'
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
          text: 'Tarea por persona asignada'
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

    let hoy:any = new Date();
   
    let mes:any=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia:any=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;

    let diaLunes:any = new Date();
    let diaMartes:any = new Date();
    let diaMiercoles:any = new Date();
    let diaJueves:any = new Date();
    let diaViernes:any = new Date();
    let diaSabado:any = new Date();
    let diaDomingo:any = new Date();
    let hoyWithFormat:string=hoy.getFullYear()+"-"+mes+"-"+dia

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
    this.chartSolicitudesNuevas(desdeIni,hastaFin)
  }

  chartSolicitudesNuevas(desde:string,hasta:string){
    this.dashboardService.getCargaDeTrabajoMasVencidos().subscribe((data:any)=>{
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
        text: "Nuevas Tareas"
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
