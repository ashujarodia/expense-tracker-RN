import { StyleSheet, Text, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
	let content = <Text style={{ color: 'white', margin: 20, fontSize: 16 }}>{fallbackText}</Text>;

	if (expenses.length > 0) {
		content = <ExpensesList expenses={expenses} />;
	}

	return (
		<View style={styles.container}>
			<ExpensesSummary
				expenses={expenses}
				periodName={expensesPeriod}
			/>
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 24,
		paddingHorizontal: 24,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.primary700,
	},
});

export default ExpensesOutput;
