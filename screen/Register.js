import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/RegistroStyles";
const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    navigation.navigate("ListaProducto");
    console.log("Registrando usuario...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Ionicons name="laptop" size={100} color="white" style={styles.ico} />
        <Text style={styles.title}>CompuMóvil</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.textInput}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={styles.textInput}>E-mail</Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.textInput}>Contrasena</Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.textInput}>Confirmas Contrasena</Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
