import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Menu from "./src/components/Menu";
import { TodosProvider } from './src/context/todosContexts';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {



  return (
    <NavigationContainer>
      <TodosProvider>
        <Menu />
      </TodosProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
