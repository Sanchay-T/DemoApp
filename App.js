import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendRequest = async () => {
    let formData = new FormData();

    formData.append('phone_number', email);
    formData.append('password', password);
    
    const response = await fetch("https://billbook.dotminds.in/public/api/user/login",{ body: formData, method: "post" });
    const json_response = await response.json();
    alert(JSON.stringify(json_response))
    if(json_response.success === true && json_response.code === 200) {
        //Parse the token
        const token = json_response.result[0].token;
        if(!token) {
            alert("Token missing in The Response Body");
        }
        //Send Token as Prop to the Next Screen and Display it

    } else {
        alert('UserName or Password is Incorrect')
    }
  }

  return (
    <View style={styles.body}>
      <Image style={styles.image} source={require("./assets/logo.png")} />
      <StatusBar style="auto" />
      <View style={styles.box}>
        <TextInput style={styles.TextInput}
          placeholder='Email'
          placeholderTextColor='#ffffff'
          onChangeText={(email) => setEmail(email)}

        />
      </View>


      <View style={styles.box}>
        <TextInput style={styles.TextInput}
          placeholder='Password'
          placeholderTextColor='#ffffff'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}

        />
      </View>

      <TouchableOpacity style={styles.LoginBtn} onPress={sendRequest}>
        <Text style={styles.text}>
          Login
        </Text>
      </TouchableOpacity>
    </View>


  );
}



const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 10,

  },
  box: {
    backgroundColor: '#FF3355',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    height: 50,
    marginLeft: 20,
    padding: 10
  },
  LoginBtn: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFAE33',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  text: {
    fontStyle: 'italic',
  }
});