import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';

//Exporting(Highcharts);

@Component({
  selector: 'app-dashboard-carga-de-trabajo',
  templateUrl: './dashboard-carga-de-trabajo.component.html',
  styleUrls: ['./dashboard-carga-de-trabajo.component.css']
})
export class DashboardCargaDeTrabajoComponent implements OnInit {

  constructor(public dashboardService:DashboardService) { }
  listaCargaDeTrabajo:any=[]
  
  ngOnInit(): void {
    
    this.dashboardService.getCargaDeTrabajoMasVencidos().subscribe((data:any)=>{
      let listaUsuarios:any=[]
      for(let info of data.carga_trabajo){
        listaUsuarios.push(info._id.id)
      }

      const dataArr = new Set(listaUsuarios);

      let result = [...dataArr];



      for(let info of data.carga_trabajo){
        let indice=result.findIndex(function(value) {
          return value==info._id.id
        });
        
        if(this.listaCargaDeTrabajo[indice]===undefined){
          this.listaCargaDeTrabajo[indice]={"carga_de_trabajo":[]};
        }
        
        this.listaCargaDeTrabajo[indice].carga_de_trabajo.push({
          "nombre":info._id.bko,
          "estado_solicitud":info._id.estado_solicitud,
          "total":info.total
        })
      }

      for(let info of data.vencidos){
        let indice=result.findIndex(function(value) {
          return value==info._id.id
        });
        this.listaCargaDeTrabajo[indice].vencidos=info.total
        this.listaCargaDeTrabajo[indice].nombre=info._id.nombre
      }

    })

  }

  mostrarTotal(data:any){
    let total:number=0
    for(let info of data.carga_de_trabajo){
      total+=info.total
    }
    return total
  }

  

}
