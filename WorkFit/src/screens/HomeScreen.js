import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [isPaused, setIsPaused] = useState(true); // Controls the pause/resume state
  const [isTimerActive, setIsTimerActive] = useState(false); // To display the timer after saving

  const handleSaveWorkout = async () => {
    if (workoutType && duration) {
      const workout = {
        id: Date.now().toString(),
        workoutType,
        duration,
      };

      try {
        const storedWorkouts = await AsyncStorage.getItem("workouts");
        const workouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
        workouts.push(workout);
        await AsyncStorage.setItem("workouts", JSON.stringify(workouts));

        Alert.alert(
          "Workout Saved",
          `You logged a ${duration}-minute ${workoutType} workout.`
        );

        setWorkoutType("");
        setDuration("");

        // Start the timer when workout is saved
        setTimer(parseInt(duration) * 60); // Convert duration to seconds
        setIsPaused(false);
        setIsTimerActive(true);
      } catch (error) {
        console.error("Error saving workout", error);
      }
    } else {
      Alert.alert("Error", "Please enter all fields.");
    }
  };

  useEffect(() => {
    let interval;
    if (!isPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      alert("Workout Complete!");
      setIsTimerActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, isPaused]);

  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const stopTimer = () => {
    setTimer(0); // Stop the timer
    setIsTimerActive(false);
    alert("Workout Stopped!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Your Workout</Text>

      <Text style={styles.label}>Workout Type</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Running"
        value={workoutType}
        onChangeText={setWorkoutType}
      />

      <Text style={styles.label}>Duration (minutes)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 30"
        value={duration}
        keyboardType="numeric"
        onChangeText={setDuration}
      />

      <Button title="Save Workout" onPress={handleSaveWorkout} />

      {isTimerActive && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
          </Text>
          <>
            <View style={{ marginBottom: 10, width: 100 }}>
              <Button
                title={isPaused ? "Resume" : "Pause"}
                onPress={togglePause}
              />
            </View>
            <View>
              <Button title="Stop Timer" onPress={stopTimer} />
            </View>
          </>
        </View>
      )}

      <View style={styles.manageWorkoutsButton}>
        <Button
          title="Manage Workouts"
          onPress={() => navigation.navigate("Timer")}
        />
      </View>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  timerContainer: {
    marginTop: 30,
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  manageWorkoutsButton: {
    marginTop: 30,
  },
});

export default HomeScreen;
