import { render, screen, fireEvent, getByText, waitFor, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from './App';

const setup = () => {
  render(<App />);
  const selectFrom = screen.getByTestId("select-from");
  const selectTo = screen.getByTestId("select-to");
  const input = screen.getByRole("textbox")
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
    expect(result).toHaveTextContent(/4\.218222722159729 Аршина/i)
    UserEvent.clear(input)
    UserEvent.type(input, "5")
    expect(result).toHaveTextContent(/4\.218222722159729 Аршина/i)
    UserEvent.click(button)
    expect(result).toHaveTextContent(/7\.030371203599549 Аршинов/i)
  });
  
});


