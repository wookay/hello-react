import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import App from './App';

function Button(props) {
  // console.log("props: ", props); // props:  { a: 1 }
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
    const button = renderer.create(<Button a={1} />);
    expect(button.props == undefined).ok();
    expect(button.toJSON()).toEqual({ type: 'button', props: {}, children: [ 'Nothing to do for now' ] });
  });
}); // describe renders


expect.extend({
  ok(received) {
    return {
        message: () => String(received), // `${received}`,
        pass: received,
      };
  }
});

function isequal(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return expect.arrayContaining(b).asymmetricMatch(a);
  } else if (typeof a === 'object' && typeof b === 'object') {
    return expect.objectContaining(b).asymmetricMatch(a);
  } else {
    return Object.is(a, b);
  }
}

describe('describe fireEvent.click', function() {
  it('click about', async () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = screen.getByText("About");
    expect(linkElement).toBeInTheDocument();
    var items = await screen.findAllByText("About")
    expect(1 == items.length).toBe(true);
    fireEvent.click(linkElement);
    var items = await screen.findAllByText("About")
    expect(2 == items.length).toBe(true);
  });

  it('render container', () => {
    const expandThumb = { more: 49 };
    const element = <h1>Hello, world</h1>;
    expect(isequal(element.props, { children: 'Hello, world' })).ok();

    const { container } = render(<div {...expandThumb}/>);
    expect(container.tagName == "DIV").ok();
    expect(container._reactRootContainer != null).ok();

    ReactDOM.unmountComponentAtNode(container);
    expect(container.tagName == "DIV").ok();
    expect(container._reactRootContainer == null).ok();

    const domNode = ReactDOM.findDOMNode(container);
    expect(domNode.tagName == "DIV").ok();
  });
}); // describe fireEvent.click


describe('describe equals', function() {
  it('==, !=', () => {
    expect(3 == 1+2).toBe(true);
    expect(3 != 1).toBe(true);
  });
}); // describe equals


const Greeting = () => {
    return (
        <div>
        </div>
    );
};

function App1() {
  return (<Greeting firstName="Ben" lastName="Hector" />);
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return (<Greeting {...props} />);
}
// https://reactjs.org/docs/jsx-in-depth.html
describe('describe Spread Attributes', function() {
  it('spread operator ...', () => {
    render(App1());
  });
}); // describe Spread Attributes

/*
https://github.com/testing-library/jest-dom
toBeDisabled
toBeEnabled
toBeEmpty
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
toHaveBeenCalledTimes
toHaveDescription
toHaveErrorMessage
*/
