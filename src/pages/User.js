import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TodosContext } from '../context/todosContexts';

import colors from '../config/colors';

export default function User() {

  const {name, setName} = useContext(TodosContext)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textTop}>User settings</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.textField}>Task name</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder='Name'
          placeholderTextColor={colors.gray100}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    alignItems: 'center',
    padding: 24,
  },
  top: {
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    marginTop: 16,
    marginBottom: 16,
  },
  textTop: {
    fontSize: 24,
    color: colors.secondary,
    fontWeight: 'bold',
  },

  field: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 16,
  },

  textField: {
    fontSize: 12,
    color: colors.gray100,
    margin: 0,
    marginLeft: 12,
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#ececec',
    height: 48,
    marginTop: 2,
    color: 'black',
    paddingLeft: 8,
    fontSize: 16,
  },
});
