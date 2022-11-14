import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryUsuarioService } from '../../services/recovery-usuario.service';

@Component({
  selector: 'app-recovery-usuario',
  templateUrl: './recovery-usuario.component.html',
  styleUrls: ['./recovery-usuario.component.css']
})
export class RecoveryUsuarioComponent implements OnInit {
  hash_id:string|null =""
  expiro:boolean=false
  success:boolean=false
  validatePass:boolean=false
  recoveryId:string|null =""
  constructor(
    public _route:ActivatedRoute,
    private router: Router,
    public recoveryUsuarioService:RecoveryUsuarioService) {
      this.hash_id=this._route.snapshot.paramMap.get("id");
     }

  ngOnInit(): void {
    
    this.recoveryUsuarioService.getRecoveryUsuario(this.hash_id).subscribe((data:any)=>{
      if(data.recovery_usuario.length==1){
        if(data.recovery_usuario[0].estado==false){
          this.recoveryId=data.recovery_usuario[0]._id
        }else{
          this.expiro=true
        }
      }
    });
  }

  validateRecoveryUser(){
    let passA:any=document.querySelector("#passA")
    let passB:any=document.querySelector("#passB")
    if(passA.value!==passB.value){
      this.validatePass=true;
      setTimeout(()=>{
        this.validatePass=false
      },2000)
      return
    }

    this.updateRecoveryUser(passA.value)
  }

  updateRecoveryUser(clave:string|null){
    let dataUpdate={
      id:this.recoveryId,
      has_recovery:this.hash_id,
      password:clave
    }

    this.recoveryUsuarioService.updateRecoveryUsuario(this.recoveryId,dataUpdate).subscribe((data:any)=>{
      this.success=true
      setTimeout(()=>{
        this.router.navigate(['/home', { }]);
        this.success=false
      },2400)
    });
  }

}
