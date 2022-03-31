import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  view: number = 0;
  result: number = 0;
  isOver: boolean = false;
  isOperation: boolean = false;
  isFirst: boolean = true;
  wasNumber: boolean = false;
  prevOperation: string = '';
  buttons = [
    'AC', '+/-', '%', '÷',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];
  handleButton(id: string) {
    if (id == '') {
      if (!this.wasNumber)
        this.view = this.result;
      return;
    }

    if (id == "AC") {
      this.cleanAC();
    }

    if (id == "+/-") {
      if (this.isOver)
        this.result *= -1;
      else
        this.view *= -1;
    }
    if (id == "%") {
      if (this.isOver)
        this.result /= 10;
      else
        this.view /= 10;
      this.prevOperation = ".";
    }
    if (id == ".") {
      this.prevOperation = ".";
    }
    if (Number(id) >= 0 && Number(id) <= 9) {
      if (this.prevOperation != '.') {
        this.typeNumber(Number(id));
      }
      else {
        this.typeDotNumber(Number(id));
      }
    }

    if (id == "+") {
      if (!this.isOperation && this.wasNumber)
        this.result = this.add(this.result, this.view);
      this.isOperation = true;
      this.prevOperation = id;
      this.eq()
    }

    if (id == "-") {
      if (!this.isOperation && this.wasNumber)
        this.result = this.sub(this.result, this.view);
      this.isOperation = true;
      this.prevOperation = id;
      this.eq();
    }

    if (id == "*") {
      if (!this.isOperation && this.wasNumber)
        this.result = this.mul(this.result, this.view);
      this.isOperation = true;
      this.prevOperation = id;
      this.eq();
    }

    if (id == "÷") {
      if (!this.isOperation && this.wasNumber)
        this.result = this.div(this.result, this.view);
      this.isOperation = true;
      this.prevOperation = id;
      this.eq();
    }

    if (id == "=") {
      this.handleButton(this.prevOperation);
      this.eq();
      console.log(this.result);
      this.prevOperation = '';
      this.wasNumber = false;
    }
  }

  add(x: number, y: number): number {
    if (this.isFirst) {
      this.isFirst = false;
    }
    return x + y;
  }

  sub(x: number, y: number): number {
    if (this.isFirst) {
      this.isFirst = false;
      return y - x;
    }
    return x - y;
  }

  mul(x: number, y: number): number {
    if (this.isFirst) {
      this.isFirst = false;
      return y * 1;
    }
    return x * y;
  }

  div(x: number, y: number): number {
    if (this.isFirst) {
      this.isFirst = false;
      return y / 1;
    }
    return x / y;
  }

  eq() {
    if (this.prevOperation == '') {
      this.result = this.view;
    }
    this.isOver = true;
  }

  cleanAC() {
    this.result = 0;
    this.view = 0;
    this.isOver = false;
    this.isOperation = false;
    this.isFirst = true;
    this.prevOperation = '';
  }

  typeNumber(x: number) {
    if (this.isOver) {
      this.isOver = false;
      this.view = 0;
    }
    if (this.isOperation) {
      this.view = 0;
      this.isOperation = false;
    }
    this.wasNumber = true;
    this.view *= 10;
    this.view += x;
  }
  typeDotNumber(x: number) {
    if (this.wasNumber) {
      let tmp = this.view.toString();
      let tmp2 = x.toString();
      let dot = '.';
      console.log(tmp + " " + tmp2);
      if (this.view % 1 != 0) {
        tmp += tmp2;
      }
      else {
        console.log(dot);
        dot += tmp2;
        console.log(dot);
        tmp += dot;
      }
      console.log(tmp);
      this.view = parseFloat(tmp);
    }
    else {
      let tmp = this.result.toString();
      let tmp2 = x.toString();
      let dot = '.';
      console.log(tmp + " " + tmp2);
      if (this.result % 1 != 0) {
        tmp += tmp2;
      }
      else {
        console.log(dot);
        dot += tmp2;
        console.log(dot);
        tmp += dot;
      }
      console.log(tmp);
      this.result = parseFloat(tmp);
    }
  }
}
