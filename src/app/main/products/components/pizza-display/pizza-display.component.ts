import {Component, Input, OnInit} from '@angular/core';
import {transition, trigger, style, animate} from "@angular/animations";

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({transform: 'translateY(-200px)', opacity: 0}),
    animate('300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(0)', opacity: 1 }))
    ]
  ),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(-200px)', opacity: 0 })
      )
  ])
 ]
);
@Component({
  selector: 'app-pizza-display',
  animations: [DROP_ANIMATION],
  templateUrl: './pizza-display.component.html',
  styleUrls: ['./pizza-display.component.scss']
})
export class PizzaDisplayComponent implements OnInit {
  @Input() pizza: any;
  constructor() { }

  ngOnInit(): void {
  }

}
