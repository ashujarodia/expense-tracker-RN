import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from './screens/ManageExpense';
import RecentExpensses from './screens/RecentExpensses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: 'white',
				tabBarStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon='add'
						size={24}
						color={tintColor}
						onPress={() => {
							navigation.navigate('ManageExpenses');
						}}
					/>
				),
			})}
		>
			<BottomTabs.Screen
				name='RecentExpenses'
				component={RecentExpensses}
				options={{
					title: 'Recent Expensses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => {
						return (
							<Ionicons
								name='hourglass'
								size={size}
								color={color}
							/>
						);
					},
				}}
			/>
			<BottomTabs.Screen
				name='AllExpenses'
				component={AllExpenses}
				options={{
					title: 'All Expensses',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) => {
						return (
							<Ionicons
								name='calendar'
								size={size}
								color={color}
							/>
						);
					},
				}}
			/>
		</BottomTabs.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary500,
							},
							headerTintColor: 'white',
						}}
					>
						<Stack.Screen
							name='ExpensesOverview'
							component={ExpensesOverview}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='ManageExpenses'
							component={ManageExpense}
							options={{
								presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
