import { useReducer } from "react";

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

  const added = (item: ItemType) => {
    dispatch({ type: ActionKind.ADDED, item });
  };

  const changed = (id: number, item: ItemType) => {
    dispatch({ type: ActionKind.CHANGED, id, item });
  };

  const deleted = (id: number) => {
    dispatch({ type: ActionKind.DELETED, id });
  };

  return { items, dispatch, added, changed, deleted };
};

export default useSimpleReducer;
