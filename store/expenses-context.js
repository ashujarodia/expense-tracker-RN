import { createContext, useReducer } from 'react';
const DUMMY_EXPENSES = [
	{
		id: 'e1',
		description: 'A pair of shoes',
		amount: 84.44,
		date: new Date('2024-04-22'),
	},
	{
		id: 'e2',
		description: 'A pair of shirts',
		amount: 12.44,
		date: new Date('2024-01-21'),
	},
	{
		id: 'e3',
		description: 'Protien',
		amount: 33.34,
		date: new Date('2024-04-04'),
	},
	{
		id: 'e4',
		description: 'A pair of shoes',
		amount: 84.44,
		date: new Date('2024-04-14'),
	},
	{
		id: 'e5',
		description: 'A pair of shirts',
		amount: 12.44,
		date: new Date('2024-01-21'),
	},
	{
		id: 'e6',
		description: 'Protien',
		amount: 33.34,
		date: new Date('2024-04-04'),
	},
	{
		id: 'e7',
		description: 'A pair of shoes',
		amount: 84.44,
		date: new Date('2024-23-14'),
	},
	{
		id: 'e8',
		description: 'A pair of shirts',
		amount: 12.44,
		date: new Date('2024-01-21'),
	},
	{
		id: 'e9',
		description: 'Protien',
		amount: 33.34,
		date: new Date('2024-04-04'),
	},
	{
		id: 'e10',
		description: 'A pair of shoes',
		amount: 84.44,
		date: new Date('2024-04-14'),
	},
	{
		id: 'e11',
		description: 'A pair of shirts',
		amount: 12.44,
		date: new Date('2024-01-21'),
	},
	{
		id: 'e12',
		description: 'Protien',
		amount: 33.34,
		date: new Date('2024-04-04'),
	},
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	deleteExpense: (id) => {},
	updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = new Date().toString() + Math.random().toString();
			return [
				{
					...action.payload,
					id: id,
				},
				...state,
			];
		case 'UPDATE':
			const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);

			const updatableExpense = state[updatableExpenseIndex];

			const updatedItem = {
				...updatableExpense,
				...action.payload.data,
			};

			const updatedExpenses = [...state];

			updatedExpenses[updatableExpenseIndex] = updatedItem;

			return updatedExpenses;
		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
}

function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

	function addExpense(expenseData) {
		dispatch({ type: 'ADD', payload: expenseData });
	}

	function deleteExpense(id) {
		dispatch({ type: 'DELETE', payload: id });
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		updateExpense: updateExpense,
	};

	return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
