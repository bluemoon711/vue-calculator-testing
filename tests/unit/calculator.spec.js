import { render, wait, fireEvent, cleanup } from "@testing-library/vue";
import "@testing-library/jest-dom/extend-expect";
import Calculator from "@/components/Calculator.vue";

afterEach(cleanup);

test("unmounts a component", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  const { unmount, isUnmounted, getByText } = render(Calculator);
  await fireEvent.click(getByText("%"));
  unmount();
  expect(isUnmounted()).toBe(true);
  await wait();
  expect(console.error).not.toHaveBeenCalled();
});

test("123 by inputing multiply numbers", async () => {
  const { getByTestId, getByTitle } = render(Calculator);
  const number1 = getByTestId("1");
  const number2 = getByTestId("2");
  const number3 = getByTestId("3");
  await fireEvent.click(number1);
  await fireEvent.click(number2);
  await fireEvent.click(number3);
  expect(getByTitle("result")).toHaveTextContent("123");
});

test("calculate value by adding/subtracting/multiplying/dividing", async () => {
  const { getByTestId, getByTitle } = render(Calculator);
  const number1 = getByTestId("8");
  const number2 = getByTestId("6");
  const number3 = getByTestId("4");
  const add = getByTitle("add");
  const substract = getByTitle("minus");
  const multiply = getByTitle("times");
  const divide = getByTitle("divide");
  const equal = getByTitle("equal");
  await fireEvent.click(number1);
  await fireEvent.click(add);
  await fireEvent.click(number2);
  await fireEvent.click(equal);
  expect(getByTitle("result")).toHaveTextContent("14");
  await fireEvent.click(multiply);
  await fireEvent.click(number2);
  await fireEvent.click(equal);
  expect(getByTitle("result")).toHaveTextContent("84");
  await fireEvent.click(divide);
  await fireEvent.click(number3);
  await fireEvent.click(equal);
  expect(getByTitle("result")).toHaveTextContent("21");
  await fireEvent.click(substract);
  await fireEvent.click(number1);
  await fireEvent.click(equal);
  expect(getByTitle("result")).toHaveTextContent("13");
});

test("cleans up after each test by default", () => {
  const { getByTitle } = render(Calculator);
  expect(getByTitle("result")).toHaveTextContent("0");
});

test("get new value by clicking clear/percent/sign buttons", async () => {
  const { getByTestId, getByTitle } = render(Calculator);
  const number = getByTestId("8");
  const clear = getByTitle("clear");
  const percent = getByTitle("percent");
  const bs = getByTitle("sign");
  await fireEvent.click(number);
  await fireEvent.click(percent);
  expect(getByTitle("result")).toHaveTextContent("0.08");
  await fireEvent.click(bs);
  expect(getByTitle("result")).toHaveTextContent("-0.08");
  await fireEvent.click(bs);
  expect(getByTitle("result")).toHaveTextContent("0.08");
  await fireEvent.click(clear);
  expect(getByTitle("result")).toHaveTextContent("0");
});
