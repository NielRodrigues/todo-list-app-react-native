import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import Home from "../pages/Home"
import Tasks from "../pages/Tasks"
import Add from "../pages/Add"
import Calendar from "../pages/Calendar"
import User from "../pages/User"

import colors from '../config/colors';

const Tab = createBottomTabNavigator();


export default function Menu() {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.menu,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: '#9cb9bf',
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <AntDesign name='appstore1' color={color} size={20} />
          )
        }}
        name='Home'
        component={Home} />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Ionicons name="newspaper" color={color} size={20} />
          )
        }}
        name='Tasks'
        component={Tasks} />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={styles.addIcon}
              onPress={() => navigation.navigate("Add")}
            >
              <AntDesign name='plus' color={colors.text} size={20}/>
            </View>
          ),
        }}
        name='Add'
        component={Add} />

    <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Ionicons name='calendar' color={color} size={20} />
          )
        }}
        name='Calendar'
        component={Calendar} />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <FontAwesome name="user" color={color} size={20} />
          )
        }}
        name='User'
        component={User} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    height: 64,
    bottom: 16,
    left: 16,
    right: 16,
    borderTopWidth: 0,
    borderRadius: 16,
  },

  addIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    color: colors.text,

  }
});
