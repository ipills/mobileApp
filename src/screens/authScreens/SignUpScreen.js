import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../global/styles'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { Icon, Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import { auth } from '../../../firebase'
import { db } from '../../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUpScreen = () => {

  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [apartement, setApartement] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [nif, setNif] = useState('')

  const [passwordFocus, setPasswordFocus] = useState(false)
  const [passwordBlur, setPasswordBlur] = useState(false)
  const [textEntry, setTextEntry] = useState(true)

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('As palavras-passe não coincidem')
    } else if (name === "") {
      Alert.alert('Por favor insira o seu nome')
    } else if (surname === "") {
      Alert.alert('Por favor insira o seu sobrenome')
    } else if (phoneNumber === "") {
      Alert.alert('Por favor insira o seu número de telefone')
    } else if (address === "") {
      Alert.alert('Por favor insira a sua morada')
    } else if (apartement === "") {
      Alert.alert('Por favor insira o seu número de apartamento')
    } else if (city === "") {
      Alert.alert('Por favor insira a sua cidade')
    } else if (postal === "") {
      Alert.alert('Por favor insira o seu código postal')
    } else if (nif === "") {
      Alert.alert('Por favor insira o seu número de identificação fiscal')
    } else if (nif.length !== 9) {
      Alert.alert('O número de identificação fiscal Invalido')
    } else if (phoneNumber.length !== 9) {
      Alert.alert('O número de telefone Invalido')
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async userCredentials => {
          const user = userCredentials.user;
          SignUpOther(user.uid, name, surname, email, phoneNumber, address, apartement, city, postal, nif)
          await AsyncStorage.setItem('currentUserUid', user.uid);
          navigation.navigate('ClientTabs', { screen: 'HomeScreen' })
        })
        .catch(error => alert(error.message))
    }
  }

  function SignUpOther(userId, name, surname, email, phoneNumber, address, apartement, city, postal, nif) {
    db.ref('users/' + userId).set({
      nome: name,
      sobrenome: surname,
      email: email,
      numeroTelefone: phoneNumber,
      morada: address,
      andar: apartement,
      cidade: city,
      codPostal: postal,
      nif: nif,
      pedidos: "",
      image: "https://imagesipills.s3.eu-west-3.amazonaws.com/noimageuser.jpg"

    }).then(() => {
      alert('Sucesso')
    }).catch((error) => {
      alert(error)
    });
  }

  return (
    <View style={styles.container}>
      <Header title="Minha Conta" type="arrow-left" navigation={navigation} />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.view1}>
          <Text style={styles.text1}>Criar Conta</Text>
        </View>
        <View style={styles.view2}>
          <View>
            <Text style={styles.text2}>Novo no iPills?</Text>
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Nome"
              style={styles.input1}
              keyboardType="default"
              autoFocus={true}
              onChangeText={text => setName(text)}
              value={name}
            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Sobrenome"
              style={styles.input1}
              keyboardType="default"
              onChangeText={text => setSurname(text)}
              value={surname}
            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Numero de Telemovel"
              style={styles.input1}
              keyboardType="number-pad"
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Morada"
              style={styles.input1}
              keyboardType="default"
              onChangeText={text => setAddress(text)}
              value={address}
            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Andar"
              style={styles.input1}
              keyboardType="default"
              onChangeText={text => setApartement(text)}
              value={apartement}
            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Cidade"
              style={styles.input1}
              keyboardType="default"
              onChangeText={text => setCity(text)}
              value={city}
            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Codigo Postal"
              style={styles.input1}
              keyboardType="number-pad"
              onChangeText={(text) => setPostal(text)}
              value={postal}
            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="NIF"
              style={styles.input1}
              keyboardType="number-pad"
              onChangeText={text => setNif(text)}
              value={nif}
            />
          </View>
          <View style={styles.view10}>
            <View>
              <Icon
                name='email'
                style={styles.email}
                color={colors.grey3}
                type="material"
              />
            </View>
            <View style={styles.view11}>
              <TextInput
                placeholder="Email"
                style={{ flex: 1 }}
                keyboardType="default"
                onChangeText={text => setEmail(text)}
                value={email}
              />
            </View>
          </View>
          <View style={styles.view14}>
            <Animatable.View animation={passwordFocus ? "fadeInRight" : "fadeInLeft"} duration={400}>
              <Icon name="lock" color={colors.grey3} type="material" />
            </Animatable.View>
            <TextInput
              placeholder="Palavra-Passe"
              style={{ flex: 1 }}
              keyboardType="default"
              secureTextEntry={textEntry}
              onChangeText={text => setPassword(text)}
              value={password}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordBlur(true)}
            />
            <Animatable.View animation={passwordBlur ? "fadeInLeft" : "fadeInRight"} duration={400}>
              <Icon
                name={textEntry ? "visibility-off" : "visibility"}
                color={colors.grey3}
                type="material"
                style={{ marginRight: 10 }}
                onPress={() =>
                  textEntry ? setTextEntry(false) : setTextEntry(true)
                }
              />
            </Animatable.View>
          </View>
          <View style={styles.view14}>
            <Animatable.View animation={passwordFocus ? "fadeInRight" : "fadeInLeft"} duration={400}>
              <Icon name="lock" color={colors.grey3} type="material" />
            </Animatable.View>
            <TextInput
              placeholder="Confirmar Palavra-Passe"
              style={{ flex: 1 }}
              keyboardType="default"
              secureTextEntry={textEntry}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordBlur(true)}
            />
            <Animatable.View animation={passwordBlur ? "fadeInLeft" : "fadeInRight"} duration={400}>
              <Icon
                name={textEntry ? "visibility-off" : "visibility"}
                color={colors.grey3}
                type="material"
                style={{ marginRight: 0 }}
                onPress={() =>
                  textEntry ? setTextEntry(false) : setTextEntry(true)
                }
              />
            </Animatable.View>
          </View>
          <View style={styles.view15}>
            <Text style={styles.text3}>Ao criar ou iniciar sessão numa conta, concorda</Text>
            <View style={styles.view16}>
              <Text style={styles.text3}>com os nossos</Text>
              <Text style={styles.text4}> Termos & Serviços</Text>
              <Text style={styles.text3}> e </Text>
            </View>
            <Text style={styles.text4}> Politica de Privacidade</Text>
          </View>
          <View style={styles.view17}>
            <Button
              title="Criar Conta"
              buttonStyle={styles.button1}
              titleStyle={styles.title1}
              onPress={handleSignUp}
            />
          </View>
          <View style={styles.view18}>
            <Text style={styles.text5}>ou</Text>
          </View>
          <View style={styles.view19}>
            <View style={styles.view20}>
              <Text style={styles.text6}>Já tem uma conta no iPills ?</Text>
            </View>
            <View style={styles.view21}>
              <Button
                title="Iniciar Sessão"
                buttonStyle={styles.button2}
                titleStyle={styles.title2}
                onPress={() => { navigation.navigate('SignInScreen') }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  view1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15
  },

  text1: {
    fontSize: 22,
    color: colors.orange,
    fontWeight: 'bold'
  },

  view2: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 15
  },

  view3: {
    marginTop: 5,
    marginBottom: 10
  },

  text2: {
    fontSize: 15,
    color: colors.grey2
  },

  view4: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5

  },

  view5: {
    marginLeft: 30,
    marginTop: 20
  },

  input1: { fontSize: 16, },

  view6: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48
  },

  view7: {
    marginLeft: 0,
    maxWidth: "65%",
  },

  input2: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0
  },

  view8: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48
  },

  view9: {
    marginLeft: 0,
    maxWidth: "65%",
  },

  input3: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0
  },

  view10: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48
  },

  email: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2
  },

  view11: {
    marginLeft: 5,
    maxWidth: "65%",
  },

  input4: {
    fontSize: 16,
    marginLeft: -20,
    marginBottom: -10
  },

  view13: {
    flexDirection: "row",
    height: 40,
  },

  view14: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.grey4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginTop: 20,
    height: 48
  },

  view15: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },

  text3: {
    fontSize: 13
  },

  view16: {
    flexDirection: 'row'
  },

  text4: {
    textDecorationLine: 'underline',
    color: 'green',
    fontSize: 13
  },

  button1: {
    backgroundColor: colors.orange,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.orange,
    height: 50,
    paddingHorizontal: 20,
    width: '100%'

  },

  title1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3

  },

  view17: {
    marginVertical: 10,
    marginTop: 30
  },

  view18: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
  },

  text5: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  view19: {
    backgroundColor: 'white',
    paddingHorizontal: 15,

  },

  view20: {
    marginTop: 5
  },

  view21: {
    marginTop: 5,
    alignItems: 'flex-end',
    paddingBottom: 10
  },

  button2: {
    backgroundColor: colors.background3,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.orange,
    height: 40,
    paddingHorizontal: 20,
    // width:'100%'

  },

  title2: {
    color: colors.orange,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3

  },
  text6: {
    color: colors.grey3,
    fontSize: 15,
    marginTop: 20,
    marginBottom: 15
  }


})