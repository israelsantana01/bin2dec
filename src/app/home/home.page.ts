import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      binary: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern(/^(1|0){1,8}$/)]
      }),
      result: new FormControl(null, {
        updateOn: 'change',
        validators: []
      })
    });
  }
 
  changeValue() {
    if (this.form.invalid) {
      this.form.controls.result.patchValue('Valor inválido');
      return;
    }

    let result: number = 0;
    let invertedString: string[] = [];
    let binary = this.form.value.binary;

    for (let i = binary.length - 1; i >= 0; i--) {
      invertedString.push(binary[i]);
    }

    invertedString.forEach((item, i) => {
      result += (+item) * Math.pow(2, i);
    })
   
    this.form.controls.result.patchValue(result);
  }
}
