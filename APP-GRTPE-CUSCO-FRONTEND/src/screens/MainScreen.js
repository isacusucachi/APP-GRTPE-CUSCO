import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ServicesScreen from "./ServicesScreen";
import ProfileScreen from "./ProfileScreen";
import ServiceDetailScreen from "./ServiceDetailScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatBotScreen from "./ChatBotScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";

const Tab = createBottomTabNavigator();
const ServicesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const ServicesStackScreen = () => {
  return (
    <ServicesStack.Navigator>
      <ServicesStack.Screen
        name="Services"
        component={ServicesScreen}
        options={{ headerShown: false }}
      />
      <ServicesStack.Screen
        name="Details"
        component={ServiceDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "", // Hide header title for this screen
        }}
      />
    </ServicesStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          headerTitle: "", // Hide header title for this screen
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "#003580",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Inicio") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Servicios") {
            return (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "ChatBot") {
            return (
              <Ionicons
                name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Perfil") {
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "white",
        backgroundColor: "white",
        tabBarActiveTintColor: "#DBFF00",
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Servicios" component={ServicesStackScreen} />
      <Tab.Screen name="ChatBot" component={ChatBotScreen} />
      <Tab.Screen name="Perfil" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
