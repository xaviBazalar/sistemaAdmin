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

    

  }

}
