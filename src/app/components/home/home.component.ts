import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiMailerInticoService } from '../../services/api-mailer-intico.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm:any;
  errorLogin:boolean=false;
  recoveryPassword:boolean=false;
  constructor(
    private router:Router, 
    public loginService:LoginService,
    public apiEmailService:ApiMailerInticoService,
    public formBuilder: FormBuilder) { 
      localStorage.setItem("usuario","")
  }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      login:['', Validators.required],
      password:['', Validators.required],
     })
  }

  validateUserEmail(){
    let email:any=document.querySelector("#emailV")

    if(email.value.trim()==""){
      return
    }

    this.loginService.recoveryAccount(email.value).subscribe((data:any)=>{
      let dataSend={
        "data":
          {
          "name_campaign" : "Envio desde app sisadmin",
          "subject" : "Reestablecimiento de contraseña",
          "html": "Haga click en el enlace para la reestablecer su contraseña",
          "email": 
            {
              "correo":data.validation[0].correo,
              "nombre":data.validation[0].nombre
            },
          "remitente": 
            {
              "correo":"platforms@inticousa.com",
              "nombre":"App SisAdmin"
            }
          }  
      }

      if(data.total===1){
        this.errorLogin=true;
        this.apiEmailService.sendEmail(dataSend).subscribe((data:any)=>{
          console.log(data)
        })
      }
    });
  }

  openRecoveryP(){
    this.recoveryPassword=true
  }

  closeRecoveryP(){
    this.recoveryPassword=false
  }

  async validatelogin(){
    let login:any
    if (this.loginForm.dirty && this.loginForm.valid) {
      login={
        login:this.loginForm.value.login,
        password:this.loginForm.value.password,
      }

      const dataLogin:any= await this.loginService.validate(login).toPromise();
      if(dataLogin.usuarios.length==1){
        this.errorLogin=false;
        localStorage.setItem("usuario",JSON.stringify(dataLogin.usuarios[0]));
        setTimeout(()=>{
          this.router.navigate(['misSolicitudes'], { });
        },1000)
      }else{
        this.errorLogin=true;
      }
      /*this.loginService.validate(login).subscribe((data:any)=>{
        
      })*/
    }
  }

}
