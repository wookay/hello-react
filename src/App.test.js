import { render, screen } from '@testing-library/react';
import App from './App';

describe('describe renders', function() {
  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders 하더놈', () => {
    render(<App />);
    const linkElement = screen.getByText(/하더놈/i);
    expect(linkElement).toBeInTheDocument();
  });
}); // describe renders

describe('describe toEqual', function() {
  it('it', () => {
    expect(3 == 1+2).toEqual(true);
  });
}); // describe toEqual

/*
https://github.com/testing-library/jest-dom
toBeDisabled
toBeEnabled
toBeEmptyDOMElement
toBeInTheDocument
toBeInvalid
toBeRequired
toBeValid
toBeVisible
toContainElement
toContainHTML
toHaveAccessibleDescription
toHaveAccessibleName
toHaveAttribute
toHaveClass
toHaveFocus
toHaveFormValues
toHaveStyle
toHaveTextContent
toHaveValue
toHaveDisplayValue
toBeChecked
toBePartiallyChecked
toHaveErrorMessage
*/
