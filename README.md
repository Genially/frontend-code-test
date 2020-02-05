Welcome to this code test! :)

The main objective of this technical excercise is for you to get a good grasp of what kind of problems we encounter on Genially. We wouldn't want you to find some nasty surprises if you decide to join us.

# Technology included

As you can see, the code test is a simple create-react-app, with some included libraries and some code bundled with it. Let's go through some of the lesser-known technologies.

## mobx-state-tree (MST for short)

This is the app state manager we use at our React apps. It's meant to be used with mobx, and unlike it, is very opinionated as how you should define your stores, models etc.

https://github.com/mobxjs/mobx-state-tree

## interact.js

Genially is a very interactivity-heavy application. Almost everything you use on the app can be moved around with your mouse, selected, scaled, rotated, etc. This library does most of the heavy lifting for us.

https://interactjs.io/

# Test requirements

The test is an extremely simplified version of the Genially editor. We provide you a working area, named `Canvas`, and elements that are displayed inside of it, named `Box`.

We've also added a rudimentary toolbar for some of the required functionality.

When finished, the app should let the user:

- Add and remove boxes.
- Select a box, which should visually indicate that is selected
- Drag the boxes around using interact.js and using React refs.
  - Keep in mind you should be able to drag a box even if it's not selected when the dragging starts.
- Changing a box's color.

# Extra credit

If you found the above too easy, or are feeling up for a bigger challenge, here are some extra tasks you could attempt:

- Display a counter indicating how many boxes are selected.
- Support selection, dragging and color changing for multiple boxes.
- Save the state of the app locally and restore it when it loads.
- Undo / Redo capabilities
  - **hint**: mobx-state-tree provides a middleware for this.

# Contact

If you have any questions about the test, you can contact any of us:

- Chema (chema@genial.ly)
- Rafa (rafa@genial.ly)
- Román (roman@genial.ly)

Good Luck!
