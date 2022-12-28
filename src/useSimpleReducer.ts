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

interface BaseItemType {
  id: number;
}

export enum ActionKind {
  ADDED = "added",
  CHANGED = "changed",
  DELETED = "deleted",
}

const buildReducer = <ItemType extends BaseItemType>() => {
  interface AddedActionType {
    type: ActionKind.ADDED;
    item: ItemType;
  }

  interface ChangedActionType {
    type: ActionKind.CHANGED;
    id: number;
    item: ItemType;
  }

  interface DeletedActionType {
    type: ActionKind.DELETED;
    id: number;
  }

  type ActionType = AddedActionType | ChangedActionType | DeletedActionType;

  return (items: ItemType[], action: ActionType): ItemType[] => {
    switch (action.type) {
      case ActionKind.ADDED: {
        return [...items, action.item];
      }
      case ActionKind.CHANGED: {
        return items.map((i) => {
          if (i.id === action.item.id) {
            return action.item;
          } else {
            return i;
          }
        });
      }
      case ActionKind.DELETED: {
        return items.filter((i) => i.id !== action.id);
      }
      default: {
        throw Error("Unknown action");
      }
    }
  };
};

const useSimpleReducer = <ItemType extends BaseItemType>(
  initialItems: ItemType[]
) => {
  const [items, dispatch] = useReducer(buildReducer<ItemType>(), initialItems);
  return { items, dispatch };
};

export default useSimpleReducer;
