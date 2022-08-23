import {PizzaFormComponent} from "./pizza-form/pizza-form.component";
import {PizzaDisplayComponent} from "./pizza-display/pizza-display.component";
import {PizzaToppingsComponent} from "./pizza-toppings/pizza-toppings.component";
import {PizzaItemComponent} from "./pizza-item/pizza-item.component";

export const components: any[] = [
  PizzaFormComponent,
  PizzaDisplayComponent,
  PizzaToppingsComponent,
  PizzaItemComponent,
];
export * from './pizza-item/pizza-item.component';
export * from './pizza-form/pizza-form.component';
export * from './pizza-display/pizza-display.component';
export * from './pizza-toppings/pizza-toppings.component';
