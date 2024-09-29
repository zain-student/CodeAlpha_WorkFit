import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BMI from "@/src/screens/BMI";
import Timer from "@/src/screens/Timer";
import HomeScreen from "@/src/screens/HomeScreen";
import Welcome from "@/src/screens/Welcome";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: "lightblue" }} />
          ),
        }}>
        <Tab.Screen
          name="WorkOut"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="weight-lifter"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Manage Workout"
          component={Timer}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="list-status"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="BMI"
          component={BMI}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calculator"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default function Index() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, headerTitle: "WorkOut" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
