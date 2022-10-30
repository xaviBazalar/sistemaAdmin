import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

  @Input()
  pagParams:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  } 

  @Output()
  refreshLista = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    
  }

  refreshPagination(info:any){
    this.refreshLista.emit(info)
  }

}
