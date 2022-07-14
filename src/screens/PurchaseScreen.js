import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase';
import * as firebase from 'firebase';
import Header from '../components/Header';

function useOnceCall(cb, condition = true) {
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (condition && !isCalledRef.current) {
      isCalledRef.current = true;
      cb();
    }
  }, [cb, condition]);
}

const PurchaseScreen = ({ navigation, route }) => {
  const [price, setPrice] = useState(0.0);


  useOnceCall(async () => {
    setPrice(route.params.price)
  }, true);

  return (
    <StripeProvider
      publishableKey="pk_test_51LJO3wJUKIUW6QCZjFqLXus9dKkNbnRPszs3wH7XinuNJoGpLXTNprNWtPZfwNPR082v8LNCT1zzkk0GUa4diPfF00RCVJbGst"
    >
      <SafeAreaView>
        <StripeTest
          price={price}
          route={route}
          navigation={navigation}
        />
      </SafeAreaView>
    </StripeProvider>
  );
};

const StripeTest = ({
  price,
  route,
  navigation
}) => {
  const { confirmPayment } = useStripe();

  const [key, setKey] = useState('');

  useEffect(() => {
    if (price === 0) return;
    fetch('https://stripe-microservice-ipills.up.railway.app/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        amount: (price) * 100
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);
        setKey(res.paymentIntent.client_secret);
      })
      .catch(e => Alert.alert(e.message));
  }, [price !== 0]);

  const handleConfirmation = async () => {
    console.log(key);
    if (key) {
      const { paymentIntent, error } = await confirmPayment(key, {
        type: 'Card',
        billingDetails: {
          email: "test@test.com",
        },
      });

      console.log(paymentIntent);

      if (!error) {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')

        const cart = await AsyncStorage.getItem('cart');
        const cartItems = JSON.parse(cart);

        const idUtilizador = currentUserUid;
        const idFarmacia = route.params.idFarmacia;
        const produtos = cartItems.map(item => { return { idProduto: item.productId, quantidade: item.quantity } });

        const pedidoRef = db.ref().child("pedidos").push()
        pedidoRef.set({ idUtilizador: idUtilizador, idFarmacia: idFarmacia, itens: produtos })
          .then(async () => {
            // Redirect
            navigation.navigate('HomeScreen');
            // Clear cart
            await AsyncStorage.removeItem('cart');
            Alert.alert('Received payment', `Billed for €${(paymentIntent?.amount / 100).toFixed(2)}`);
          }).catch((error) => {
            console.error(error);
          });
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={{ marginTop: 30 }}>
      <Header title="Mudar Morada" type="arrow-left" navigation={navigation} />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button title="Confirm payment" onPress={handleConfirmation} />
    </View>
  );
};

export default PurchaseScreen;
