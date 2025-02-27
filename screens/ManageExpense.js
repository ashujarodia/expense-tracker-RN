import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';

function ManageExpense({ route, navigation }) {
	const { deleteExpense, updateExpense, addExpense } = useContext(ExpensesContext);

	const editedExpenseId = route.params?.expenseId;

	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		console.log(editedExpenseId);

		deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}
	function confirmHandler() {
		if (isEditing) {
			updateExpense(editedExpenseId, {
				description: 'Textasdf',
				amount: 123,
				date: new Date('2024-04-22'),
			});
		} else {
			addExpense({
				description: 'Text',
				amount: 12,
				date: new Date('2024-04-23'),
			});
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<Button
					mode='flat'
					onPress={cancelHandler}
					style={styles.button}
				>
					Cancel
				</Button>
				<Button
					style={styles.button}
					onPress={confirmHandler}
				>
					{isEditing ? 'Update' : 'Add'}
				</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon='trash'
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});
