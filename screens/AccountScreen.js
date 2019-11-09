import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

export default function AccountScreen() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const loginDataObj = JSON.parse(loginData);
  
  const handleLogin = async () => {
    try{
      const response = await fetch('http://kingspay@www.kingspay.live/tnc/exec_return_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });
      const responseJson = await response.json();

      if(responseJson.status === 'error'){
        setShowErr(true);
      } else {console.log(responseJson);
        await AsyncStorage.setItem('loginData', JSON.stringify(responseJson));
        setLoginData(JSON.stringify(responseJson));
        // const value = await AsyncStorage.getItem('loginData');
      }
    } catch (err) {
      setShowErr(true);
    }
  }

  const LoginView = () => (
    <>
      <Text>Please Login to TouchNConnect to access the full functionality!</Text>
      <InputBox
        textContentType='username'
        value={user}
        onChangeText= {(text) => { setUser(text) }}
        placeholder='Username'
      />
      <InputBox
        textContentType='newPassword'
        value={password}
        onChangeText= {(text) => { setPassword(text) }}
        placeholder='Password'
      />
      <Button
        onPress={handleLogin}
        title="Login"
        color="#841584"
        accessibilityLabel="Login to your account"
      />
      {showErr && <Text>Login Failed</Text>}
    </>
  );

  const ProfileView = () => (
    <>{loginData}
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
        {loginDataObj && loginDataObj.status === 'success' ? <ProfileView /> : <LoginView />}
      </View>
    </ScrollView>
  );
}


AccountScreen.navigationOptions = {
  title: 'My Account',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
});
