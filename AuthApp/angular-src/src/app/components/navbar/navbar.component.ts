import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private flashMess: FlashMessagesService,
                private authService: AuthService,
                private router:Router) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMess.show("You've been logged out" , {cssClass: 'alert-info'});
    this.router.navigate(['/login'])
    return false;
  }

}
