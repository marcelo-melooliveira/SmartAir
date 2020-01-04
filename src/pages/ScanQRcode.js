import React, {Component} from 'react';
import { View,StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
 
 } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage'
//import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export default class ScanQRcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serial:''
    };
  }

/*
  componentDidMount(){
    
        auth().onAuthStateChanged(function(user) {
            if (user) {
              // Redirecionamento de tela.
              //this.setState({isModalVisible:0});
              console.log("entrou na escuta");
              console.log(user);
            }
          });
    
          
    
    } */


  


  




    onSuccess = (e) => {
        alert(e.data)
      }

      barcodeRecognized = ({ barcodes }) => {
        barcodes.forEach(barcode => {this.props.navigation.navigate('SerialProduto', {serial:barcode.data})})
      };

  render() {
    return (

      <ImageBackground
      source={require('../img/background.png')}
      imageStyle={{resizeMode:'stretch'}}
      style={{
        flex:1
      }}
      >

      <View style={{flexDirection:'row'}}>
      <View style={{width:'85%', height:50, backgroundColor:'#3850CE', justifyContent:'center'}}>
        <Text style={{color:'#FFF', fontWeight:'bold', fontSize:18, marginLeft:10}}>QRCODE DO PRODUTO</Text>
     </View>

     <View style={{width:'15%', height:50, backgroundColor:'#3850CE', justifyContent:'center', alignItems:'flex-end', paddingRight:8}}>
     <Icon name='arrow-right' size={25} color='#FFF' onPress={() => {this.props.navigation.navigate('SerialProduto')} }/> 
     </View>
      </View>
         
      

       <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex:1
           
            
            
          }}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized} 
        >
        

  <BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={false}/> 
        </RNCamera>
     
            
 
     
      
      
      </ImageBackground>
      
      
      
    );
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    
    //paddingHorizontal:20
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    height:35,
    backgroundColor:'#00008B',
    borderRadius:5,
    alignSelf:'stretch',
  
    marginHorizontal:35,
    marginVertical:3
  },
  textButton:{
    color:'#FFF',
    fontWeight:'bold'

  }
 
})

