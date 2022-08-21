import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm:any;
  errorLogin:boolean=false;
  constructor(
    private router:Router, 
    public loginService:LoginService,
    public formBuilder: FormBuilder) { 
      sessionStorage.setItem("usuario","")
  }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      login:['', Validators.required],
      password:['', Validators.required],
     })
  }

  validatelogin(){
    let login:any
    if (this.loginForm.dirty && this.loginForm.valid) {
      login={
        login:this.loginForm.value.login,
        password:this.loginForm.value.password,
      }
      this.loginService.validate(login).subscribe((data:any)=>{
        if(data.usuarios.length==1){
          this.errorLogin=false;
          sessionStorage.setItem("usuario",JSON.stringify(data.usuarios[0]));
          setTimeout(()=>{
            this.router.navigate(['misSolicitudes'], { });
          },1000)
        }else{
          this.errorLogin=true;
        }
      })
    }
  }

}
