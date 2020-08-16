import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-postauth-nav',
  templateUrl: './postauth-nav.component.html',
  styleUrls: ['./postauth-nav.component.scss']
})
export class PostauthNavComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    $('.has_submenu> a').on('click', function (e) {
      e.preventDefault();
      $(this).siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
  }
  toggleSideNav(evt): void {
    const layoutBody = document.getElementById('mainBody');
    layoutBody.classList.toggle('menu_collapse_ar');
  }
  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    if (localStorage.getItem('AccessToken') != null) {
      localStorage.removeItem('AccessToken');
    }
    this.router.navigateByUrl('login');
  }
}
