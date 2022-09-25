import { render, screen, fireEvent, getByText, waitFor, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from './App';

const setup = () => {
  render(<App />);
  const selectFrom = screen.getByTestId("select-from");
  const selectTo = screen.getByTestId("select-to");
  const input = screen.getByRole("spinbutton")
  const button = screen.getByText(/Применить/i)
  const result = screen.getByText(/Результат/i)
  return {
    selectFrom,
    selectTo,
    input,
    button,
    result,
  }
}


describe('all tests', () => {
  test('all elements in document', () => {
    const {selectFrom, selectTo, button, input, result} = setup()
    expect(selectFrom).toBeInTheDocument();
    expect(selectTo).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(result).toBeInTheDocument();
    
  });
  test('metre to arshin', async () => {
    const { selectFrom, selectTo, button, input, result } = setup()
    const fromBtn = within(selectFrom).getByRole("button")
    const toBtn = within(selectTo).getByRole("button")
    UserEvent.click(fromBtn)
    const metrOptionFrom = screen.getByRole("option", {name: /^метр$/i, hidden: false})
    UserEvent.click(metrOptionFrom)
    UserEvent.click(toBtn)
    const arOptionTo = screen.getByRole("option", { name: /^аршин$/i, hidden: false })
    UserEvent.click(arOptionTo)
    UserEvent.type(input, "3")
    UserEvent.click(button)
    expect(result).toHaveTextContent(/4\.2182 Аршина/i)
    UserEvent.clear(input)
    UserEvent.type(input, "5")
    expect(result).toHaveTextContent(/4\.2182 Аршина/i)
    UserEvent.click(button)
    expect(result).toHaveTextContent(/7\.0304 Аршинов/i)
  });
  test("select from working", () => {
    const { selectFrom } = setup()
    const fromBtn = within(selectFrom).getByRole("button")
    UserEvent.click(fromBtn)
    const metrOptionFrom = screen.getByRole("option", { name: /^метр$/i, hidden: false })
    const arOptionFrom = screen.getByRole("option", { name: /^аршин$/i, hidden: false })
    const yardOptionFrom = screen.getByRole("option", { name: /^ярд$/i, hidden: false })
    UserEvent.click(metrOptionFrom)
    expect(fromBtn).toHaveTextContent(/^метр$/i)
    UserEvent.click(arOptionFrom)
    expect(fromBtn).toHaveTextContent(/^аршин$/i)
    UserEvent.click(yardOptionFrom)
    expect(fromBtn).toHaveTextContent(/^ярд$/i)

  })
  test("select to working", () => {
    const { selectTo } = setup()
    const toBtn = within(selectTo).getByRole("button")
    UserEvent.click(toBtn)
    const metrOptionFrom = screen.getByRole("option", { name: /^метр$/i, hidden: false })
    const arOptionFrom = screen.getByRole("option", { name: /^аршин$/i, hidden: false })
    const yardOptionFrom = screen.getByRole("option", { name: /^ярд$/i, hidden: false })
    UserEvent.click(metrOptionFrom)
    expect(toBtn).toHaveTextContent(/^метр$/i)
    UserEvent.click(arOptionFrom)
    expect(toBtn).toHaveTextContent(/^аршин$/i)
    UserEvent.click(yardOptionFrom)
    expect(toBtn).toHaveTextContent(/^ярд$/i)
  })
  test("input type working", () => {
    const { input } = setup()
    UserEvent.type(input, "4567")
    expect(input).toHaveValue(4567)
  })
  test("input type only valid symbols", () => {
    const { input } = setup()

    UserEvent.type(input, "asdfgh654sadf23")
    expect(input).not.toHaveValue("asdfgh654sadf23")
    expect(input).toHaveValue(65423)
  })
  
});


