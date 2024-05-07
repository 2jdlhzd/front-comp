import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  WebView,
  ActivityIndicator,
} from "react-native";
import Axios from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Carrito = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  state = {
    accessToken: null,
    approvalUrl: null,
    paymentId: null,
  };
  const Details = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: "100",
          currency: "MXN",
          details: {
            subtotal: "100",
            tax: "0",
            shipping: "0",
            handling_fee: "0",
            shipping_discount: "0",
            insurance: "0",
          },
        },
      },
    ],
    redirect_urls: {
      return_url: "https://example.com",
      cancel_url: "https://example.com",
    },
  };

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 30 },
    // Agrega más productos según tus necesidades
  ];

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const StartPay = () => {
    Axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      { grant_type: "client_credentials" },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: ` Bearer A21AAIBBpEJobbyfjno52WD0oZhzOymXosLTTQNumNR1VlwlH0lct4Ix3YspgnTwHVLDPkRyy_Jup_SimQVhPypLrb33Tj9XQ`,
        },
      }
    )
      .then((response) => {
        //console.log(response.data.access_token);
        this.setState({
          accessToken: response.data.access_token,
        });
        Axios.post(
          "https://api.sandbox.paypal.com/v1/payments/payment",
          Details,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer A21AAIBBpEJobbyfjno52WD0oZhzOymXosLTTQNumNR1VlwlH0lct4Ix3YspgnTwHVLDPkRyy_Jup_SimQVhPypLrb33Tj9XQ`,
            },
          }
        )
          .then((response) => {
            console.log("Response", response);
            const { id, links } = response.data;
            const approvalUrl = links.find(
              (data) => data.rel == "approval_url"
            );
            this.setState({
              paymentId: id,
              approvalUrl: approvalUrl.href,
            });
            console.log(id);
            console.log(approvalUrl);
          })
          .catch((err) => {
            console.log(...err);
          });
      })
      .catch((err) => {
        console.log({ ...err });
      });
  };

  _onNavigationStateChange = (webViewState) => {
    if (webViewState.url.includes("https://example.com/")) {
      this.setState({
        approvalUrl: null,
      });

      const { PayerID, paymentId } = webViewState.url;

      Axios.post(
        `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        { payer_id: PayerID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log({ ...err });
        });
    }
  };

  const deleteItem = async (id) => {
    try {
      await Axios.delete(`/carritos/eliminar/${id}`);
      console.log("Elemento eliminado");
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await Axios.get(`/carritos/obtener/${user_id}`, {
          //headers: { Authorization: BarProp },
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibm9tYnJlIjoicHdlcSIsImFwZWxsaWRvcyI6ImNhYnJlcmEgYWd1aXJyZSIsImNvcnJlbyI6Imhlcm5hbmRlemo5NTlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTIkWW5xTHd0amlRbTBWUnlSaWZqYS5ST0dRNWNiMHlyUDcuOG9qZmVVV3BSdEZqVUlYWno5SWkiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTI5VDE4OjU4OjM5LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTI5VDE4OjU4OjM5LjAwMFoiLCJpYXQiOjE3MTQ1MDcyMDQsImV4cCI6MTcxNDU5MzYwNH0s.n1JAE7CvXqdTg6Bvt5qNYp8ltEz9pKZoVPI24y - imZg",
          },
        });
        console.log(response);
        setCartItems((prev) => (prev = response.data.response));
      } catch (err) {
        console.log(err);
      }
    };

    fechData();
  }, [actualizar]);

  /*  useEffect(() => {
    const getToken = async () => {
      const result = await AsyncStorage.getItem("login");
      setToken(result);
    };
    getToken();
  }, []); */

  //console.log(cartItems, token);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => {
          console.log(item, "desde flat");
          return (
            <View>
              <Text>{item.nombre}</Text>
              <Text>${item.precio}</Text>
              <Button
                title="elimnar del carrito"
                onPress={() => deleteItem(item.id)}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Total: ${calculateTotalPrice()}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Pagar"
          onPress={() => {
            {
              //StartPay();
              navigation.navigate("Paypal");
            }
          }}
          //disabled={cartItems.length === 0}
        />
        <Button
          title="Vaciar Carrito"
          onPress={() => setCartItems([])}
          disabled={cartItems.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default Carrito;
