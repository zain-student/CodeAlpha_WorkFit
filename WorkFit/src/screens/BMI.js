import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  StatusBar,
} from "react-native";
import React, { useState } from "react";

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiResult, setBmiResult] = useState("");

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100;

    if (weightInKg > 0 && heightInMeters > 0) {
      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi.toFixed(2));

      if (calculatedBmi < 18.5) {
        setBmiResult("Underweight");
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
        setBmiResult("Normal weight");
      } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
        setBmiResult("Overweight");
      } else {
        setBmiResult("Obesity");
      }
    } else {
      setBmi(null);
      setBmiResult("Please enter valid values");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="rgba(0,0,0,0.2)" />
      <Text style={styles.label}>Enter your weight (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="e.g. 70"
      />

      <Text style={styles.label}>Enter your height (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholder="e.g. 170"
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your BMI: {bmi}</Text>
          <Text style={styles.resultText}>Category: {bmiResult}</Text>
        </View>
      )}
    </View>
  );
};

export default BMI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
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
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  resultText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});
