import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  kindergartens

  constructor(public apiService: ApiService) { }

  ngOnInit() {
this.apiService.getKindergartens().subscribe(resp=>{
  console.log(resp)
  this.kindergartens = resp["data"]
})

  }

}
