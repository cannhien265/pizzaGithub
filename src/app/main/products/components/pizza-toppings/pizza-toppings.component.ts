import {
  Component, EventEmitter,
  Input, OnInit, Output,
} from '@angular/core'
import {Topping} from "../../models/topping.model";

@Component({
  selector: 'app-pizza-toppings',
  templateUrl: './pizza-toppings.component.html',
  styleUrls: ['./pizza-toppings.component.scss']
})
export class PizzaToppingsComponent implements OnInit{
  @Input() toppings: Topping[] = [];
  @Output() getValue = new EventEmitter<Topping[]>();
  value: Topping[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  // selectTopping => value[] if click then add topping else unclick then remove from value
  selectTopping(topping: Topping) {
    if (this.existsInToppings(topping)) {
      this.value = this.value.filter(item => item.id !== topping.id);
    } else {
      this.value = [...this.value, topping];
    }
    console.log('value_toppings', this.value);
    this.getValue.emit(this.value);
  }
  existsInToppings(topping: Topping) {
    return this.value.some(val => val.id === topping.id);
  }
}
