import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
                private flashMess: FlashMessagesService,
                private authService: AuthService,
                private router:Router ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    }
    console.log(user);
    if(!this.validateService.validateRegister(user))
    {
      this.flashMess.show('rip fill all', {cssClass: 'alert-danger'});
      return false;
    }

    if(!this.validateService.validateEmail(user.email))
    {
      this.flashMess.show('rip email', {cssClass: 'alert-danger'});
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMess.show(data.msg , {cssClass: 'alert-sucess'});
        this.router.navigate(['/login'])
      } else {
      }
    });
  }

}
