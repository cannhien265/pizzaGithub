import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'app-pizza-form',
  styleUrls: ['pizza-form.component.scss'],
  templateUrl: './pizza-form.component.html',
})
export class PizzaFormComponent implements OnChanges {
  exists = false;
  toppingClick: Topping[] = [];
  @Input() pizza: Pizza = {};
  @Input() toppings: Topping[] = [];

  @Output() selected = new EventEmitter<number[]>();
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();

  form = this.fb.group({
    name: ['', Validators.required],
    toppings: new FormArray([]),
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.pizza && this.pizza.id) {
      console.log('pizza_onChange',this.pizza);
      this.exists = true;
      this.form.patchValue(this.pizza as any);
    }
    // this.form.get('toppings')?.valueChanges.subscribe(toppings => {
    //   toppings.map((topping: Topping) => topping.id)
    // })
  //   this.form.get('toppings')?.valueChanges.pipe(
  //     map(toppings => toppings.map((topping: Topping) => topping.id))
  //   )
  //     .subscribe(value => {
  //       console.log('value_onChange', value);
  //       this.selected.emit(value as any)});
   }

  createPizza(form: FormGroup) {
    console.log('form', form);
    const { value, valid } = form;
    value.toppings = this.toppingClick;
    console.log('value_create', value);
    console.log('valid', valid);
    if (valid) {
      this.create.emit(value);
    }
  }

  updatePizza(form: FormGroup) {
    console.log('form', form);
    const { value, valid, touched } = form;
    console.log('valid', valid);
    console.log('touched', touched);
    value.toppings = this.toppingClick;
    console.log('value_update', {...this.pizza, ...value});
    if (valid) {
      this.update.emit({ ...this.pizza, ...value });
    }
  }

  removePizza(form: FormGroup) {
    // const { value } = form;
    // value.toppings = this.toppingClick;
    // console.log('value_remove', value);
    // this.remove.emit({ ...this.pizza, ...value });
    this.remove.emit(this.pizza);
  }
  getValue($event: Topping[]) {
     this.toppingClick = $event;
  }
}
