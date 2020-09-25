import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView, Keyboard, TextInput, 
  TouchableOpacity, StyleSheet, Animated} from 'react-native';

export default function App() {
 
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 15}))
  const [logo] = useState(new Animated.ValueXY({x: 250, y: 220}))
 

  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener('KeybordDidShow', KeyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('KeybordDidHide', KeyboardDidHide);


    Animated.spring(offset.y, {
      toValue:0,
      speed: 4,
      bounciness: 40
    }).start();
  },[])

  function KeyboardDidShow(){

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 10,
        duration:100,
      }),
      Animated.timing(logo.y, {
        toValue: 10,
        duration: 100,
      })
     
    ]).start();
  }

  function KeyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 250,
        duration:100,
      }),
      Animated.timing(logo.y, {
        toValue: 220,
        duration: 100,
      })
     
    ]).start();
  }

  return (
   <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
        style={{
          width: logo.x,
          height: logo.y
        }}
        source={require('./assets/logo.png')}
        />
        <Text>Deus Seja Louvado</Text>
      </View>
      <Animated.View 
      style={[
        styles.container,
        {
          
          transform:[
            { translateY: offset.y }
          ]
        }
        ]}>
      <TextInput
       style={styles.input}
      placeholder="Email" 
      autoCorrect={false}
      onChangeText={() => {}}
      />

       <TextInput
       style={styles.input}
      placeholder="Senha" 
      autoCorrect={false}
      onChangeText={() => {}}
      />
      <TouchableOpacity style={styles.btnSubmit}>
         <Text style={styles.submitText}>Acessar</Text>         
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRegister}>
         <Text style={styles.btnRegisterText}>Criar conta gratuita</Text>         
      </TouchableOpacity>
      </Animated.View>
      </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  containerLogo:{
     flex:1,
    justifyContent: 'center'
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom:15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit:{
    marginTop:20,
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister:{
    marginTop: 10,    
  },
  btnRegisterText:{
    color: '#FFF',
  }

});

