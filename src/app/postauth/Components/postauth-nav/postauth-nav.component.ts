import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-postauth-nav',
  templateUrl: './postauth-nav.component.html',
  styleUrls: ['./postauth-nav.component.scss']
})
export class PostauthNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  toggleSideNav(evt): void {
    let layoutBody = document.getElementById('mainBody');
    layoutBody.classList.toggle('menu_collapse_ar');
  }

}
