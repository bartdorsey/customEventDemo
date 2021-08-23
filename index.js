const button = document.getElementById('fetchDog');
const image = document.getElementById('dogimage');

// We create an eventTarget object to hold our custom event 
// (We could probably use any DOM element for this as well,
// because all DOM elements inherit from EventTarget)
const eventTarget = new EventTarget();

// We listen for the 'onDog' event on this object
// 'onDog' is our custom event string
eventTarget.addEventListener('onDog', event => {
  // When the event fires, this call back recieves our
  // custom event object, and the dogUrl is stored
  // on the detail property
  console.log(event);
  // So we can now set the src of the image tag
  image.src = event.detail.dogUrl;
});

// Fetchdog is an async function which fetches a dog and dispatches 
// our custom 'onDog' event.
const fetchDog = async () => {
  // Using the dog API, we fetch a random dog using the fetchAPI
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  // We parse the json, and extract the 'message' property 
  // into a variable called dogUrl 
  const { message: dogUrl } = await response.json();
  // We create a new customEvent object to dispatch,
  // We store the dogUrl in the details object
  const customEvent = new CustomEvent('onDog', {
    detail: {
      dogUrl
    }
  });
  // We dispatch the event on the eventTarget
  eventTarget.dispatchEvent(customEvent);
}

// We listen for a click on the button
// When we click, it calls fetchDog
button.addEventListener('click', fetchDog);
