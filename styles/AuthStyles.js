import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  banner: {
    alignItems: "center",
    height: 260,
    borderBottomRightRadius: 200,
    backgroundColor: "#8400FF",
  },
  ico: {
    marginTop: 70,
  },
  box: { marginTop: 70, alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
    marginBottom: 20,
    margin: 10,
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
  },
  btn: {
    alignItems: "center",
    marginTop: 40,
  },
  loginButton: {
    height: 48,
    width: 300,
    backgroundColor: "#8400Ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  createAccountText: {
    color: "white",
    textDecorationLine: "underline",
  },
  todoContainer: {
    marginTop: 70,
    alignItems: "center",
  },
  socialLoginContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  socialButton: {
    width: 150,
    height: 48,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    flexDirection: "row",
    borderWidth: 1,
  },
  socialButtonText: {
    color: "grey",
    marginLeft: 10,
    fontWeight: "bold",
  },
  noAccountContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default styles;
