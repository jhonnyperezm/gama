import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';


@Component({
  selector: 'app-viewinicial',
  templateUrl: './viewinicial.page.html',
  styleUrls: ['./viewinicial.page.scss'],
})
export class ViewinicialPage implements OnInit {
  dataJson:any =[];

  constructor( private router : Router, public home:HomeService) { }

  ngOnInit() {
   
   
  }

  iniciar(){
    this.router.navigate(['/inicio'])
  }

  getData(){
    this.home.getUsers().subscribe(data => this.dataJson = data)
    
  }
}
