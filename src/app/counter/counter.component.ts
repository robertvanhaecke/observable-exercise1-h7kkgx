import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Observer {
  next: (value?: any) => void;
  error?: (error: any) => void;
  complete?: () => void;
}
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  public count: number = 0;
  private incrementButton: HTMLButtonElement;
  private decrementButton: HTMLButtonElement;

  constructor() {}

  ngOnInit() {
    this.incrementButton = document.querySelector('#incrementBtn');
    this.decrementButton = document.querySelector('#decrementBtn');
    this.observeIncrementButtonClick();
  }

  // use the observer interface and the Observable class to create your own observer
  // clicking the button should increate count by 1
  // remember, a call to next() invokes this on the observer ;)
  // the observer handles the incrementing of the counter
  // use intellisense to check which method we could use on incrementButton
  // subscriber and observer are used interchangeable in the documentation
  // https://rxjs-dev.firebaseapp.com/api/index/class/Observable
  private observeIncrementButtonClick(): void {
    //const observable = new Observable(observer => {...})
    //  const observer: Observer = {};
    const obs = new Observable((observer) => {
      this.incrementButton.onclick = () => observer.next();
    });
    obs.subscribe((x) => this.count++);
  }

  private observeDecrementButtonClick(): void {}

  // whenever we call observeIncrementButtonClick we register an observer
  // we dont unregister it... meaning if we would recreate this component, we would have two subcriptions...
  // unregister by saving the subscriptions in a global variable and unregistering them when the component gets destroyed.

  // extra challenge
  //could you implement the same thing, without using a global variable?
}
