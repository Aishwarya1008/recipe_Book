import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: string;
  constructor(private apiService: ApiService,
              public authService: AuthService) { }

  ngOnInit() {
    this.token = localStorage.getItem('userToken');
    console.log(this.token);
  }
  onSaveData() {
   this.apiService.storeRecipes().subscribe((response) => {
     console.log(response);
   });
  }
  onFetchData() {
    this.apiService.fetchRecipes();
  }
  onLogout() {
    this.authService.logOut();
  }
}
