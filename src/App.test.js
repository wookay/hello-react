import { render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import App from './App';

function Button(props) {
  return <button>Nothing to do for now</button>;
}

describe('describe renders', function() {
  it('renders learn react link', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders 하더놈', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const p = screen.getByText("하더놈", { exact: false });
    expect(p).toBeInTheDocument();
  });

  it('unmount', () => {
    const { container, unmount } = render(<BrowserRouter><App /></BrowserRouter>);
    unmount();
    var got_error = false
    try {
      const p = screen.getByText("하더놈", { exact: false });
    } catch (error) {
      expect(error.name == "TestingLibraryElementError").toBe(true);
      got_error = true
    }
    expect(got_error).toBe(true);
  });

  it('renders toJSON', () => {
    const button = renderer.create(<Button />);
    expect(button.toJSON()).toEqual({ type: 'button', props: {}, children: [ 'Nothing to do for now' ] });
  });
}); // describe renders


describe('describe equals', function() {
  it('==, !=', () => {
    expect(3 == 1+2).toBe(true);
    expect(3 != 1).toBe(true);
  });
}); // describe equals

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
