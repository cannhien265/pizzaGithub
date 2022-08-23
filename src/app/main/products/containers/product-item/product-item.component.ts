import { Component, OnInit } from '@angular/core';
// models
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
// services
import {PizzasService} from "../../services";
import {ToppingsService} from "../../services";
// Routes
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  // data
  pizza: Pizza = {};
  // pizza = {null} if create, pizza = {id} if view
  visualise: Pizza = {};
  //
  toppings: Topping[] = [];
  // toppings = get data service

  constructor(
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // get data
    this.pizzaService.getPizzas().subscribe(pizzas => {
      console.log('pizzas_item', pizzas);
      let pizza: any;
      this.route.url.subscribe(urlSegment => {
        let param = urlSegment[0]?.path;
        console.log('param', param);
        if (param === 'new') {
          pizza = {};
        } else {
          pizza = pizzas.find(pizza => pizza.id === param); /* parseInt "parseInt(param, 10))" chuyen param co type string thanh number = id: number */
        }
      })
      // const param: any = this.route.snapshot.url;
      // console.log('param', param);
      // let pizza;
      // if (param === 'new') {
      //   pizza = {};
      // } else {
      //   pizza = pizzas.find(pizza => pizza.id === parseInt(param, 10));
      // }
      this.pizza = pizza;
      console.log('pizza_item', this.pizza);
      this.toppingsService.getToppings().subscribe(toppings => {
        this.toppings = toppings;
        console.log('toppings', this.toppings);

        // @ts-ignore
        this.onSelect(toppings.map(topping => topping.id));
        console.log('visualise', this.visualise);
      })
    })
  }
  // onSelect use to
  onSelect(event: number[]) {
    let toppings;
    if (this.toppings && this.toppings.length) {
      toppings = event.map(id =>
        this.toppings.find(topping => topping.id === id)
      );
    } else {
      toppings = this.pizza?.toppings;
    }
    // @ts-ignore
    this.visualise = {...this.pizza, toppings};
  }

  onCreate(event: Pizza) {
    this.pizzaService.createPizza(event).subscribe(pizza => {
      this.router.navigate([`/products`]);
    });
  }

  onUpdate(event: Pizza) {
    this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });
    }
  }
}
