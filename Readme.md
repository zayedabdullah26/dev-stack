# DevStack - Development Stack Builder 

# Description:
 A modern React application designed for developers to explore various technologies, compare them, and build their ideal project development stack.

# Technologies Used
- **React.js** 
- **Vite**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **React Toastify**
- **JSON**

# 3 Features
1. **Dynamic Technology Exploration**
2. **Interactive Stack Builder**
3. **Responsive UI & Notifications**

# React Conceptual Questions & Answers

1. What is JSX, and why is it used in React?
**Answer:** JSX means JavaScript XML. It allows us to write HTML-like syntax directly inside JavaScript files. It is used because it makes writing and reading UI components much cleaner and more interactive.

# 2. What is the difference between props and state?
**Answer:** 
- Props are passed down from a parent component to a child component and are read-only
- State is managed from within the component itself and can change over time based on user interactions or data updates.

# 3. What does the useState hook do, and where did you use it in this project?
**Answer:** useState is a React Hook that lets functional components remember and manage state variables.In this project, I used it to track the selected technologies in the user's stack, handle loading states, and toggle the mobile menu.

# 4. What does the useEffect hook do, and why did you need it to load the JSON data?
**Answer:** useEffect handles side effects in React components (like data fetching, subscriptions, or timers). We needed it to fetch the technologies.json file once when the component first loads (`mount`), preventing infinite fetching loops.

# 5. Why does every item in a .map() list need a unique key prop?
**Answer:** React uses the key prop to efficiently identify which items in a list have changed, been added, or been removed. This helps React update the DOM correctly without re-rendering the entire list.

# 6. What is conditional rendering? Show one place you used it.
**Answer:** Conditional rendering means displaying different UI elements based on certain conditions (like if/else or ternary operators). 
*Example used in project:* Showing an empty state message ("Your stack is empty.") when no items are selected, and rendering the selected items list once technologies are added.

# 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
**Answer:** 
- Parent to Child: Data is passed down as attributes called "props".
- Child to Parent: The parent passes a callback function down via props, and the child calls that function to send data or trigger an action back to the parent.