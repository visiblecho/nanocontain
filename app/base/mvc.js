/* mvc.js

Defines all base classes for the MVC setup.
No functionality specific to nanocontain is implemented here.
! Derived classes MUST do:
- Add own functionality to Model.actions[]
- Use updateState(newState) instead of modifying Model.states[] directly
- Override View.render(state)

*/

export class Model {
    constructor() {
        console.debug('Model.constructor');
        this.observers = [];
        this.actions = {};
        this.states = [];
    }

    // Changes the game's state. Use this function to establish an undo/redo stack.
    // TODO: Validate that this syntax works
    updateState(newState) { this.states.push({...this.states.at[-1], ...newState}); }

    // Called when the user triggers an action
    performAction(action, data) { this.actions[action](data); }

    // Adds an observer to the Model 
    subscribeToNotifications(observer) { this.observers.push(observer); }

    // Notifies all subscribed observers of the latest game state (e.g., after modification)
    notifyObservers() { this.observers.forEach(observer => observer(this.states.at[-1])); }
};

export class View {
    constructor(root) {
        this.root = root;

        // Right-click flags a cell as contageous. Prevent the contex menu to show.
        this.root.addEventListener('contextmenu', event => event.preventDefault())
    }

    // Renders the given state to the UI
    render(state) { throw new Error('Method must be overriden') }

    // Adds an observer to click events on the UI
    // ! The action type must be encoded in the event target as data-action-left or -right property
    // Example: <button data-action-left="start">Start</button>
    // Clicking left will call Model.actions['start'](dataset)
    subscribeToAction(handler) {
        console.debug("View.subscribeToClickAction");
        this.root.addEventListener('pointerup', event => {
            const actionLeft = event.target.dataset.actionLeft;
            const actionRight = event.target.dataset.actionRight; 
            if ((event.button === 0) && (actionLeft)) handler(actionLeft, event.target.dataset);
            if ((event.button === 2) && (actionRight)) handler(actionRight, event.target.dataset);
        });
    }
};

export class Controller {
    constructor(model, view) {
        console.debug('Controller.constructor')
        this.model = model;
        this.view = view;

        // Trigger actions on the model when the user clicks the UI
        this.view.subscribeToAction((action, data) => this.model.performAction(action, data));

        // Trigger a UI render when the model's state is updated.
        this.model.subscribeToNotifications(state => this.view.render(state));
    }
};