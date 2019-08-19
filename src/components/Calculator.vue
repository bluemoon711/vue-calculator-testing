<template>
  <div class="calculator">
    <div class="display" title="result">
      {{ current || "0" }}
    </div>
    <div @click="clear" class="btn" title="clear">AC</div>
    <div @click="sign" class="btn" title="sign">+/-</div>
    <div @click="percent" class="btn" title="percent">%</div>
    <div @click="divide" class="btn operator" title="divide">÷</div>
    <div @click="append('7')" class="btn" data-testid="7">7</div>
    <div @click="append('8')" class="btn" data-testid="8">8</div>
    <div @click="append('9')" class="btn" data-testid="9">9</div>
    <div @click="times" class="btn operator" title="times">x</div>
    <div @click="append('4')" class="btn" data-testid="4">4</div>
    <div @click="append('5')" class="btn" data-testid="5">5</div>
    <div @click="append('6')" class="btn" data-testid="6">6</div>
    <div @click="minus" class="btn operator" title="minus">-</div>
    <div @click="append('1')" class="btn" data-testid="1">1</div>
    <div @click="append('2')" class="btn" data-testid="2">2</div>
    <div @click="append('3')" class="btn" data-testid="3">3</div>
    <div @click="add" class="btn operator" title="add">+</div>
    <div @click="append('0')" class="btn zero" data-testid="0">0</div>
    <div @click="dot" class="btn" data-testid=".">.</div>
    <div @click="equal" class="btn operator" title="equal">=</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previous: null,
      current: "",
      operator: null,
      operatorClicked: false
    };
  },
  methods: {
    clear() {
      this.current = "";
    },
    sign() {
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : `-${this.current}`;
    },
    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    setPrevious() {
      this.previous = this.current;
      this.operatorClicked = true;
    },
    divide() {
      this.operator = (a, b) => a / b;
      this.setPrevious();
    },
    times() {
      this.operator = (a, b) => a * b;
      this.setPrevious();
    },
    minus() {
      this.operator = (a, b) => a - b;
      this.setPrevious();
    },
    add() {
      this.operator = (a, b) => a + b;
      this.setPrevious();
    },
    equal() {
      this.current = `${this.operator(
        parseFloat(this.previous),
        parseFloat(this.current)
      )}`;
      this.previous = null;
    }
  }
};
</script>

<style scoped>
.calculator {
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}
.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
}
.zero {
  grid-column: 1 / 3;
}
.btn {
  background-color: #f2f2f2;
  border: 1px solid #999;
}
.operator {
  background-color: orange;
  color: white;
}
</style>
