import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Axios from "../Axios";
import styles from "../styles/AuthStyles";
import Auth from "../components/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({ status: false, msg: "" });
  const [isPending, setIsPending] = useState(false);

  const handle = (e, name) => {
    setUser((prev) => ({ ...prev, [name]: e }));
  };
  const Pass = (e, password) => {
    setUser((prev) => ({ ...prev, [password]: e }));
  };
  const storeData = async (value) => {
    try {
      const jsonvalue = JSON.stringify(value);
    } catch (e) {}
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
      }
    } catch (e) {}
  };

  const login = async () => {
    setIsPending(true);
    //console.log(user);
    try {
      const res = await Axios.post("/usuarios/login", user, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibm9tYnJlIjoicHdlcSIsImFwZWxsaWRvcyI6ImNhYnJlcmEgYWd1aXJyZSIsImNvcnJlbyI6Imhlcm5hbmRlemo5NTlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTIkWW5xTHd0amlRbTBWUnlSaWZqYS5ST0dRNWNiMHlyUDcuOG9qZmVVV3BSdEZqVUlYWno5SWkiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTI5VDE4OjU4OjM5LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTI5VDE4OjU4OjM5LjAwMFoiLCJpYXQiOjE3MTQ1MDcyMDQsImV4cCI6MTcxNDU5MzYwNH0s.n1JAE7CvXqdTg6Bvt5qNYp8ltEz9pKZoVPI24y - imZg",
        },
      });
      navigation.navigate("ListaProducto");
      console.log(res);
      await AsyncStorage.setItem("login", JSON.stringify(res.data.response));

      console.log(res.data.response.token);
    } catch (error) {
      console.log(error);
      //navigation.navigate("ListaProducto");
      setError({ status: true, msg: "Usuario o contraseña incorrectos" });
      setTimeout(() => {
        setError({ status: false, msg: "" });
      }, 100);
    }

    setIsPending(false);
  };

  const handleCreateAccount = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de registro
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Ionicons name="laptop" size={100} color="white" style={styles.ico} />
        <Text style={styles.title}>CompuMóvil</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.formContainer}>
          <Text style={styles.textInput}>E-mail</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(text) => handle(text, "correo")}
            />
          </View>
          <Text style={styles.textInput}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => Pass(text, "password")}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={login}
              disabled={isPending}
            >
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Auth />
      <View style={styles.noAccountContainer}>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text
            style={styles.createAccountText}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            ¿No tienes una cuenta? Crea una aquí
          </Text>
        </TouchableOpacity>
      </View>
      {true && <Text style={{ color: "red" }}>{error.msg}</Text>}
    </View>
  );
};

export default Login;
