import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Timer = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const storedWorkouts = await AsyncStorage.getItem("workouts");
        if (storedWorkouts) {
          setWorkouts(JSON.parse(storedWorkouts));
        }
      } catch (error) {
        console.error("Error fetching workouts", error);
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id) => {
    try {
      const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
      await AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.error("Error deleting workout", error);
    }
  };

  const renderWorkout = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text>
        {item.workoutType} - {item.duration} minutes
      </Text>
      <Button
        title="Delete"
        onPress={() =>
          Alert.alert("Delete Workout", "Are you sure?", [
            { text: "Cancel" },
            { text: "Yes", onPress: () => deleteWorkout(item.id) },
          ])
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Workouts</Text>
      {workouts.length === 0 ? (
        <Text>No workouts logged yet.</Text>
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderWorkout}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button title="Back to Log" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  workoutItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Timer;
