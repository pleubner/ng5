import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
// 1. Import the Data Service
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter',style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),            
          ]))
        ]),  {optional: true}),

        query(':leave', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),            
          ]))
        ]),  {optional: true})

      ])
    ])

  ]
})



export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an Item';
  goalText: string = 'My first life goal';

  // 3. remove the hard coded array values
  // goals=['My first life goal','I want to climb a mountain','Go ice skiiing'];
  goals=[];
  
  // 2. Create Instance using dependency injection
  constructor(private _data: DataService) { }

  ngOnInit() {
    // 8. put this after 4.
    // this.itemCount = this.goals.length;
    // 4. Access to goal 
    this._data.goal.subscribe(res => this.goals = res);
    // 8. put here 
    this.itemCount = this.goals.length;

    // 5. Also update the goals array
    this._data.changeGoal(this.goals);
  }
   
  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    // 6. Also update array on add
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
    this.goals.splice(i,1);
    // 7. Also update array on delete
    this._data.changeGoal(this.goals);
  }
}

