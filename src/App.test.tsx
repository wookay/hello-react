import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import App from './App'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Logger } from 'tslog'

const log: Logger = new Logger({
  displayDateTime: false,
  dateTimeTimezone: "Asia/Seoul",
  displayFunctionName: false,
  fileLocation: false,
  overwriteConsole: true,
  displayFilePath: "hidden",
  prettyInspectOptions: {
    colors: true,
    compact: true,
  },
  printLogMessageInNewLine: false,
  // displayTypes: true,
})

function Button(props) {
  // log.info("props: ", props) // props:  { a: 1 }
  // tsx
  return <button {...props}>Nothing to do for now</button>
}

describe('describe renders', function() {
  it('renders learn react link', () => {
    render(<BrowserRouter><App /></BrowserRouter>)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('renders 하더놈', () => {
    render(<BrowserRouter><App /></BrowserRouter>)
    const nodes = screen.getAllByText("하더놈", { exact: false })
    nodes.forEach(p => expect(p).toBeInTheDocument())
  })

  it('unmount', () => {
    const { container, unmount } = render(<BrowserRouter><App /></BrowserRouter>)
    unmount()
    var got_error = false
    try {
      const p = screen.getAllByText("하더놈", { exact: false })
    } catch (error) {
      expect(error.name == "TestingLibraryElementError").ok()
      got_error = true
    }
    expect(got_error).ok()
  })

  it('renders toJSON', () => {
    const button = renderer.create(<Button a={1} />)
    expect(button.props == undefined).ok()
    expect(button.toJSON()).toEqual({ type: 'button', props: { a: 1 }, children: [ 'Nothing to do for now' ] })
  })
}) // describe renders


expect.extend({
  ok(received) {
    return {
        pass: received,
        message: () => String(received), // `${received}`,
      }
  }
})

// ts
declare global {
  namespace jest {
    interface Matchers<R> {
      ok(): R
    }
  }
}

function isequal(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return expect.arrayContaining(b).asymmetricMatch(a)
  } else if (typeof a === 'object' && typeof b === 'object') {
    return expect.objectContaining(b).asymmetricMatch(a)
  } else {
    return Object.is(a, b)
  }
}

describe('describe fireEvent.click', function() {
  it('click about', async () => {
    render(<BrowserRouter><App /></BrowserRouter>)
    const linkElement = screen.getByText("About")
    expect(linkElement).toBeInTheDocument()
    var items = await screen.findAllByText("About")
    expect(1 == items.length).ok()
    fireEvent.click(linkElement)
    var items = await screen.findAllByText("About")
    expect(2 == items.length).ok()
  })

  it('render container', () => {
    const element = <h1>Hello, world</h1>
    expect(isequal(element.props, { children: 'Hello, world' })).ok()

    const expandThumb = { more: 49 }
    const { container } = render(<div {...expandThumb}/>)
    expect(container.tagName == "DIV").ok()
    expect(container._reactRootContainer != null).ok()

    ReactDOM.unmountComponentAtNode(container)
    expect(container.tagName == "DIV").ok()
    expect(container._reactRootContainer == null).ok()

    const domNode = ReactDOM.findDOMNode(container)
    expect(domNode.tagName == "DIV").ok()
  })
}) // describe fireEvent.click

describe('describe equals', function() {
  it('==, !=', () => {
    expect(3 == 1+2).ok()
    expect(3 != 1).ok()
  })

  class A {
  }
  it('class', () => {
    const a = new A()
    expect(a instanceof A).ok()
    expect(a instanceof Object).ok()
    expect(a.constructor == A).ok()
    expect(a.constructor.name == "A").ok()
    expect(A.name == "A").ok()
    expect(A.prototype.isPrototypeOf(a)).ok()

    A.prototype.f = function (x) { return x+1 }
    expect(a.f(2) == 3).ok()

    A.prototype.f = undefined
    expect(a.f == undefined).ok()

    expect(A.constructor instanceof Function).ok()
    expect(A.prototype.constructor == A).ok()
    expect(A["prototype"] == A.prototype).ok()
    expect(Number instanceof Function).ok()
    expect(A instanceof Function).ok()
  })

  // https://www.typescriptlang.org/docs/handbook/advanced-types.html
  it('Advanced Types', () => {
    const a: (number | string) = 1
    const b: (number | string) = "hi"
    const c: null = null
    const arr: (number | string)[] = [1, "hi"]
    expect(a == 1).ok()
    expect(b == "hi").ok()
    expect(arr[1] == "hi").ok()

    var aOrNull: (string | null) = "hi"
    expect(aOrNull == "hi").ok()
    aOrNull = null
    expect(aOrNull == null).ok()
  })

  it('crazy js', () => {
     expect(5 == [5]).ok()
     expect(5 == "5").ok()
     expect("5" == [5]).ok()
     expect(!isequal(5, [5])).ok()
     expect(!isequal(5, "5")).ok()
     expect(!isequal("5", [5])).ok()
     expect(void 0 == undefined).ok()
  })

  // https://stackoverflow.com/questions/16672743/javascript-null-check
  it('crazy if', () => {
     expect( (true      ? true : false)).ok()
     expect(!(false     ? true : false)).ok()
     expect( (1         ? true : false)).ok()
     expect(!(0         ? true : false)).ok()
     expect( (-1        ? true : false)).ok()
     expect( ("true"    ? true : false)).ok()
     expect( ("false"   ? true : false)).ok()
     expect( ("false"   ? true : false)).ok()
     expect( ("false"   ? true : false)).ok()
     expect( ("1"       ? true : false)).ok()
     expect( ("0"       ? true : false)).ok()
     expect( ("-1"      ? true : false)).ok()
     expect(!(""        ? true : false)).ok()
     expect(!(null      ? true : false)).ok()
     expect(!(undefined ? true : false)).ok()
     expect( (Infinity  ? true : false)).ok()
     expect( (-Infinity ? true : false)).ok()
     expect( ([]        ? true : false)).ok()
     expect( ({}        ? true : false)).ok()
     expect( ([[]]      ? true : false)).ok()
     expect( ([0]       ? true : false)).ok()
     expect( ([1]       ? true : false)).ok()
     expect(!(NaN       ? true : false)).ok()
  })
}) // describe equals


const Greeting = () => {
    return (
        <div>
        </div>
    )
}

function App1() {
  return (<Greeting firstName="Ben" lastName="Hector" />)
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'}
  return (<Greeting {...props} />)
}
// https://reactjs.org/docs/jsx-in-depth.html
describe('describe Spread Attributes', function() {
  it('spread operator ...', () => {
    render(App2())
  })
}) // describe Spread Attributes

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
