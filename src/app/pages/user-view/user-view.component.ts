import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  public users: any;


  ngOnInit(): void {
    this.userService.get().subscribe((res)=>{    
      this.users = res;
    })
    
  }
  editUser(user: any){

  }
}
