import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewfinal',
  templateUrl: './viewfinal.page.html',
  styleUrls: ['./viewfinal.page.scss'],
})
export class ViewfinalPage implements OnInit {

  DataCarrito:any = [];
  total:number=0

  constructor( private router : Router ) { }

  ngOnInit() {
  }

  volverInicio(){
    localStorage.setItem('data', JSON.stringify(this.DataCarrito = []));
    localStorage.setItem('total', JSON.stringify(this.total = 0));
    this.router.navigate(['/viewinicial'])
   
  }

}
