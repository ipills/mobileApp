import React, { useContext, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements"
import { colors } from '../../../src/global/styles'
import Carousel from "pinar";
import Carousel1 from "../../../assets/carousel/Carousel1.png";
import Carousel2 from "../../../assets/carousel/Carousel2.png";
import Carousel3 from "../../../assets/carousel/Carousel3.png";
import { SignInContext } from "../../contexts/authPersistence";
import { useNavigation } from "@react-navigation/native";
import * as firebase from 'firebase'

import * as RootNavigation from '../../navigation/utils/rootNavigation';
import { auth } from "../../../firebase";

export default function SignInWelcomeScreen() {

  const navigation = useNavigation();

  return (
    <Carousel>
      <View style={styles.slide1}>
        <Image source={Carousel1} style={styles.image} />
        <Text style={styles.text}>Encomendas</Text>
        <Text style={styles.text}>Feitas na Hora e</Text>
        <Text style={styles.text}>Entregues no mesmo Dia!</Text>
      </View>
      <View style={styles.slide2}>
        <Image source={Carousel2} style={styles.image} />
        <Text style={styles.text}>Um Equipa de</Text>
        <Text style={styles.text}>Farmaceuticos Pronta a</Text>
        <Text style={styles.text}>Tratar do seu Pedido!</Text>
      </View>
      <View style={styles.slide3}>
        <>
          <Image source={Carousel3} style={styles.image} />
          <Text style={styles.text}>A Sua Saude é o</Text>
          <Text style={styles.text}>Mais Importante</Text>
          <Text style={styles.text2}>Crie a sua conta, já!</Text>
          <Button
            title="Criar Conta"
            titleStyle={styles.buttonTitle}
            buttonStyle={{ ...styles.button, marginBottom: 5 }}
            onPress={() => {
              navigation.navigate("SignUpScreen")
            }}
          >
          </Button>
          <Text style={{ opacity: 0.7 }}>Já tem Conta?</Text>
          <Button
            title="Iniciar Sessão"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => {
              navigation.navigate("SignInScreen")
            }}
          >
          </Button>
        </>
      </View>
    </Carousel>
  );
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  text: {
    color: "#1f2d3d",
    opacity: 0.7,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center"
  },
  text2: {
    color: "#1f2d3d",
    opacity: 0.7,
    fontSize: 22,
    textAlign: "center",
    marginTop: 30
  },
  button: {
    backgroundColor: colors.orange,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.orange,
    height: 50,
    width: 300,
    marginTop: 25,
    marginBottom: 5
  },
  button2: {
    backgroundColor: colors.orange,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.orange,
    height: 50,
    width: 300,
    marginTop: 5,
    textAlign: 'center',
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: -3,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
})

