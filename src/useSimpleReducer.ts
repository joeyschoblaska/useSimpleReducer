import { useReducer } from "react";

// could I turn this into a hook that creates a generic reducer?
// * implements added / changed / deleted in predictable way
//   * each one is exported as a function
//   * eg: { items, added } = useSimpleReducer([])
//         added({ id: 1, text: "hello" })
// * each can be overridden
// * conventional dispatch functions are also implemented in a way that's
//   simple to call from component
// * is this similar? https://github.com/immerjs/use-immer#useimmerreducer
// * bog reducer: a bog-standard reducer

const buildReducer = () => {
  return (items, action) => {
    switch (action.type) {
      case "added": {
        return [
          ...items,
          {
            id: action.id,
            text: action.text,
            done: false,
          },
        ];
      }
      case "changed": {
        return items.map((i) => {
          if (i.id === action.task.id) {
            return action.task;
          } else {
            return i;
          }
        });
      }
      case "deleted": {
        return items.filter((i) => i.id !== action.id);
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  };
};

const useSimpleReducer = (initialItems) => {
  const [items, dispatch] = useReducer(buildReducer(), initialItems);
  return { items, dispatch };
};

export default useSimpleReducer;
