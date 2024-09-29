import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Alert,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { auth } from "@/src/Firebase/Config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Welcome = ({ navigation }) => {
  const [LoginModalShown, setLoginModalShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [RegisterModalShown, setRegisterModalShown] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const image = {
    uri: "https://png.pngtree.com/thumb_back/fh260/background/20220606/pngtree-fitness-app-gym-application-medicine-photo-image_31019772.jpg",
  };
  const register = () => {
    if (
      registerEmail != "" &&
      registerPassword != "" &&
      registerConfirmPassword != "" &&
      registerUsername != ""
    ) {
      if (registerPassword == registerConfirmPassword) {
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
          .then((userCredential) => {
            const user = userCredential.user;
            ToastAndroid.show("Registered Successfully!", ToastAndroid.SHORT);
            setRegisterModalShown(false);
            navigation.navigate("Home");

            setRegisterConfirmPassword("");
            setRegisterEmail("");
            setRegisterUsername("");
            setRegisterPassword("");
          })
          .catch((error) => {
            setRegisterError(error.message);
          });
      } else {
        ToastAndroid.show("Passwords do'nt Match!", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Please fill all the fields!", ToastAndroid.SHORT);
    }

    // createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     ToastAndroid.show("Registered Successfully!");
    //     Alert("Registered Successfully!");
    //     setRegisterModalShown(false);
    //     navigation.navigate("Home");
    //     setRegisterUsername("");
    //     setRegisterEmail("");
    //     setRegisterPassword("");
    //     setRegisterConfirmPassword("");
    //   })
    //   .catch((error) => {
    //     setRegisterError(error.message);
    //   });
  };
  const Login = () => {
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          ToastAndroid.show("Logged In Successfully!", ToastAndroid.SHORT);
          navigation.navigate("Home");
          setLoginModalShown(false);
          setLoginEmail("");
          setPassword("");
        })
        .catch((error) => {
          setLoginError(error.message);
        });
    } else {
      ToastAndroid.show("Please fill all the fields!", ToastAndroid.SHORT);
    }
  };
  const haveAnAccount = () => {
    setRegisterUsername("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
    setLoginModalShown(true);
    setRegisterModalShown(false);
  };
  const notHaveAnAccount = () => {
    setEmail("");
    setPassword("");
    setRegisterModalShown(true);
    setLoginModalShown(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="rgba(0,0,0,0.2)" />
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 50,
            color: "white",
            fontWeight: "600",
            fontStyle: "italic",
            marginLeft: 10,
            marginTop: 10,
          }}>
          Welcome,
        </Text>
        <Text style={{ fontSize: 25, color: "white", marginBottom: 30 }}>
          {"\n "}
          to the{" "}
          <Text style={{ fontSize: 30, fontWeight: "500", color: "white" }}>
            "WorkFit".
          </Text>
          Ready to Reach Your Fitness Goals?
          {"\n"} "Move More, Achieve More."
        </Text>
        <Modal
          visible={LoginModalShown}
          animationType="slide"
          transparent={true}>
          <View style={styles.modal}>
            <Text style={{ color: "white", fontSize: 40, top: -70 }}>
              Login Here
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter Your Email..."
              autoCapitalize="none"
              placeholderTextColor={"white"}
              style={styles.inputText}
            />
            <TextInput
              value={password}
              // keyboardType="visible-password"
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Enter Your Password..."
              placeholderTextColor={"white"}
              style={styles.inputText}
            />
            <TouchableOpacity style={styles.modalButton} onPress={Login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => notHaveAnAccount()}>
              <Text style={styles.backButton}>{"<"} Don't have an account</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* Registration Model */}
        <Modal
          visible={RegisterModalShown}
          animationType="slide"
          transparent={true}>
          <View style={styles.RegisterModal}>
            <Text style={{ color: "white", fontSize: 40, top: -70 }}>
              Register Here
            </Text>
            <TextInput
              value={registerUsername}
              onChangeText={setRegisterUsername}
              keyboardType="default"
              placeholder="Enter Your UserName..."
              placeholderTextColor={"white"}
              style={styles.inputText}
            />
            <TextInput
              value={registerEmail}
              onChangeText={setRegisterEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter Your Email..."
              placeholderTextColor={"white"}
              style={styles.inputText}
            />
            <TextInput
              value={registerPassword}
              onChangeText={setRegisterPassword}
              secureTextEntry={true}
              // keyboardType="visible-password"

              placeholder="Enter Your Password..."
              placeholderTextColor={"white"}
              style={styles.inputText}
            />
            <TextInput
              value={registerConfirmPassword}
              onChangeText={setRegisterConfirmPassword}
              secureTextEntry={true}
              // keyboardType="visible-password"
              placeholder="Enter Password Again..."
              placeholderTextColor={"white"}
              style={styles.inputText}
            />
            <TouchableOpacity style={styles.modalButton} onPress={register}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => haveAnAccount()}>
              <Text style={styles.backButton}>
                {"<"} Already have an account
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginModalShown(true)}>
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setRegisterModalShown(true)}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#4F7992",
  },
  modal: {
    position: "absolute",
    top: 100,
    bottom: 0,
    backgroundColor: "rgba(52,5,40,0.97)",
    // backgroundColor: "#2B424F",
    width: "90%",
    height: 500,
    alignSelf: "center",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  inputText: {
    top: -50,
    bottom: 0,
    height: 40,
    width: "90%",
    borderColor: "gray",
    color: "white",
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalButton: {
    width: "90%",
    height: "10%",
    backgroundColor: "#4CAF50",
    // backgroundColor: "green",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },
  button: {
    width: "90%",
    height: "7%",
    backgroundColor: "#4CAF50",
    // backgroundColor: "green",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
  },
  backButton: {
    // color: "white",
    fontSize: 20,
    bottom: -70,
    left: -30,
    color: "#4CAF50",
  },
  RegisterModal: {
    position: "absolute",
    top: 100,
    bottom: 0,
    backgroundColor: "rgba(52,5,40,0.97)",
    // backgroundColor: "#2B424F",
    width: "90%",
    height: 600,
    alignSelf: "center",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
