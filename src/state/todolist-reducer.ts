export type StateType = {
  id: string;
  title: string;
};

export type ActionType = {
  type: string;
};

export const todolistReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    default:
      throw new Error("I dont understand this action type");
  }
};
