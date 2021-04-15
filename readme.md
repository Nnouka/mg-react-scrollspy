# mg-react-scrollspy

## Description
This is a scrollspy wrapper for react components

## Usage
```js
import {ScrollSpy, TriggerMode } from "mg-react-scrollspy";
import {
  animationNames,
  animationTypes,
  createAnimatedComponent,
} from "./lib/animation";

const Card = function (props) {
  return <div style={props.style}>{props.name}</div>;
};

const Spied = createAnimatedComponent(() => (
  <Card style={{ color: "blue" }} name='Spied Card'/>
));

ReactDOM.render(
  <ScrollSpy
        render={({triggerIn, triggerOut, scrollMode}) => { console.log("scrollMode", scrollMode); return (
          <Spied
            duration={2}
            delay={1}
            type={animationTypes.ENTRANCE}
            name={animationNames.TOP}
            start={triggerOut}
          />
        )}}
        triggerMode={TriggerMode.BOTH}
      />,
  document.getElementById("root")
);
```

##  API

The api is simple
1. Props
    1. render : function

     this is the function which is called to render the coponent you want to spy for scroll event
     it is called with the following object
     ```js
     {triggerIn, triggerOut, scrollMode}
     ```
     2. triggerMode

     to indicate when you intend to trigger an action
     
     ```js
     triggerMode = TriggerMode.IN // trigger when scrolling down and the coponent is gets into the viewport
     triggerMode = TriggerMode.OUT // trigger when scrolling up and the component is getting out of the viewport
     // default is 'in'
     ```
     3. thresholdDown

     this is the threshold in pixel to trigger when scrolling down default is 15
     ```json
     Note. Strings are not valid here. only int e.g '10px' is invalid 10 is valid
     ```
     4. thresholdUp

     this is the threshold in pixel to trigger when scrolling up default is 15
     ```json
     Note. Strings are not valid here. only int e.g '10px' is invalid 10 is valid
     ```
