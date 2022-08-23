import {Topping} from "./topping.model";
export interface Pizza {
  id?: string;
  name?: string;
  toppings?: Topping[];
}
