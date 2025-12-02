# State Management Comparison App

A Next.js application demonstrating six different state management approaches with identical functionality, making it easy to compare and understand the differences between each approach.

## 🎯 Purpose

This project helps developers understand the trade-offs between different state management solutions by implementing the same counter application using:

1. **useState + Props Drilling** - Traditional React approach (the baseline)
2. **React Context API** - Built-in React solution
3. **Zustand** - Minimal state management library
4. **Redux** - Traditional Redux with full boilerplate
5. **Redux Toolkit (RTK)** - Modern Redux with simplified API
6. **XState** - State machines and statecharts

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
app/
├── page.tsx                    # Landing page with comparison
├── layout.tsx                  # Root layout with navigation
├── demos/
│   ├── context/               # React Context implementation
│   │   ├── CounterContext.tsx
│   │   ├── components/
│   │   └── page.tsx
│   ├── zustand/               # Zustand implementation
│   │   ├── store.ts
│   │   ├── components/
│   │   └── page.tsx
│   ├── redux/                 # Traditional Redux
│   │   ├── store.ts
│   │   ├── components/
│   │   └── page.tsx
│   ├── rtk/                   # Redux Toolkit
│   │   ├── store.ts
│   │   ├── components/
│   │   └── page.tsx
│   └── xstate/                # XState
│       ├── counterMachine.ts
│       ├── components/
│       └── page.tsx
components/
├── ui/                        # shadcn/ui components
└── Navigation.tsx             # Main navigation
```

## 🎨 Features

Each implementation includes:

- ✅ Increment/Decrement counter
- ✅ Reset counter to zero
- ✅ Async increment (1 second delay)
- ✅ Multiple components sharing state
- ✅ Loading states for async operations
- ✅ TypeScript support

## 📊 Comparison

### useState + Props Drilling

**Bundle Size:** 0 KB (built-in)

**Pros:**
- No external dependencies
- Simple and straightforward
- Easy to learn and understand
- Great for local component state
- Explicit data flow

**Cons:**
- Props drilling - must pass props through intermediate components
- State must live in common ancestor
- Difficult to share state across distant components
- Components become tightly coupled
- Hard to refactor component structure

**Best for:** Small apps, local component state, simple hierarchies (2-3 levels deep)

### React Context API

**Bundle Size:** 0 KB (built-in)

**Pros:**
- No external dependencies
- Built into React
- Good for simple state
- Type-safe with TypeScript

**Cons:**
- Can cause unnecessary re-renders
- Requires boilerplate with useReducer
- Limited dev tools
- Manual async handling

**Best for:** Simple to moderate state management in small to medium apps

### Zustand

**Bundle Size:** ~3 KB

**Pros:**
- Minimal boilerplate
- No Provider needed
- Built-in selector optimization
- Simple and intuitive API
- Small bundle size

**Cons:**
- Smaller ecosystem
- Fewer middleware options
- Less established patterns for large apps

**Best for:** Most applications, especially when you want simplicity with good performance

### Redux

**Bundle Size:** ~12 KB

**Pros:**
- Mature and battle-tested
- Excellent Redux DevTools
- Large ecosystem
- Predictable state updates
- Great for complex apps

**Cons:**
- Significant boilerplate
- Steep learning curve
- Verbose code
- Manual middleware setup

**Best for:** Large, complex applications where predictability and debugging are critical

### Redux Toolkit (RTK)

**Bundle Size:** ~14 KB

**Pros:**
- Much less boilerplate than Redux
- Built-in best practices
- Excellent TypeScript support
- Same great DevTools
- Simplified async with createAsyncThunk

**Cons:**
- Still requires Provider
- Larger than simpler solutions
- Learning curve for Redux concepts

**Best for:** When you need Redux power but want modern DX and less boilerplate

### XState

**Bundle Size:** ~7 KB

**Pros:**
- Impossible states become impossible
- Visual state machine diagrams
- Excellent for complex workflows
- Built-in async state handling
- Great TypeScript support
- XState Inspector for debugging

**Cons:**
- Different mental model (state machines)
- Steeper learning curve
- Can be overkill for simple state
- More verbose for basic use cases

**Best for:** Complex user flows, multi-step processes, state-dependent UIs, when you need visual documentation

## 💡 Learning Points

### Setup Complexity

1. **useState** - Simplest: Just use the hook (but props drilling!)
2. **Zustand** - Very Simple: Single file, hook-based, no Provider
3. **Context** - Simple: Context + Provider + useReducer
4. **RTK** - Moderate: createSlice + configureStore
5. **XState** - Moderate: Define state machine + useMachine
6. **Redux** - Most Complex: Actions, reducers, middleware, store

### The Evolution Story

This comparison shows the evolution of React state management:

1. **useState** - The problem: props drilling becomes painful
2. **Context** - React's built-in solution to avoid props drilling
3. **Redux** - Industry standard for complex apps (lots of boilerplate)
4. **Zustand** - Modern alternative with minimal API
5. **RTK** - Redux made simpler and more modern
6. **XState** - Different paradigm: state machines for complex logic

### Code Sample Comparison

**useState:**
```typescript
// Parent component
const [count, setCount] = useState(0);

// Must pass to children
<Child count={count} setCount={setCount} />

// Props drilling through middleware
<Middleware count={count}>
  <GrandChild count={count} /> 
</Middleware>
```

**Zustand:**
```typescript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));

// No props needed - access anywhere!
const count = useStore((state) => state.count);
```

**Context:**
```typescript
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });
```

**Redux:**
```typescript
// Define action types, action creators, reducer, store...
dispatch(increment());
```

**RTK:**
```typescript
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; }
  }
});
```

**XState:**
```typescript
const counterMachine = createMachine({
  id: 'counter',
  initial: 'idle',
  context: { count: 0 },
  states: {
    idle: {
      on: {
        INCREMENT: {
          actions: assign({ count: (ctx) => ctx.count + 1 })
        }
      }
    }
  }
});
```

## 🛠️ Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Zustand** - State management
- **Redux** - State management
- **Redux Toolkit** - State management
- **XState** - State machines and statecharts

## 📚 Resources

- [React Context Docs](https://react.dev/learn/passing-data-deeply-with-context)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Redux Docs](https://redux.js.org/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [XState Docs](https://xstate.js.org/)
- [XState Visualizer](https://stately.ai/viz)

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment!

## 📄 License

MIT

---

Built with ❤️ for learning purposes
