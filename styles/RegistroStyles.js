import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    marginTop: 80,
    alignItems: "center",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    margin: 10,
    borderWidth: 1,
  },
  textInput: {
    marginRight: "auto",
    marginLeft: 40,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8400FF",
    width: "80%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
export default styles;
