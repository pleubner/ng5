import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// 1. Import
import { DataService } from '../data.service'; 

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // 3. define goals of "any" type
  goals: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) { 
    this.route.params.subscribe(res => console.log(res.id));
  }

  ngOnInit() {
    // 2.
    this._data.goal.subscribe(res => this.goals = res);
  }

 
  sendMeHome() {
    this.router.navigate(['']); // this is the path from the home component in app-routing.module.ts
  }
}
