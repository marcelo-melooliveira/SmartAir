import React from 'react';
import { View } from 'react-native';
import teste from '../../testeLottie1.json';
import Lottie from 'lottie-react-native';


// import { Container } from './styles';

export default function LoginPage() {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Lottie resizeMode='contain' autoSize source={teste} autoPlay loop />
    
    </View>
  );
}