import React, {Component} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ImageBackground,Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert
} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      isModalVisible:0
    };
  }

  login = async () =>{
       const {email, password} = this.state;
       this.setState({isModalVisible:1});
    try{
     await auth().signInWithEmailAndPassword(email, password);

     const user_update =  auth().currentUser;
     this.saveinfoLocal(user_update);
     // console.log(user);
      this.setState({isModalVisible:0});
      this.props.navigation.navigate('InsereProduto');

     
    } catch(err){
      this.setState({isModalVisible:0});
        if(err.code == "auth/user-not-found"){
          Alert.alert(
            'Ops.. Houve um erro',
            'Usuário não encontrado',
            [              
              {text: 'OK', onPress: () => null},
            ]
          
          );
        }else if(err.code == "auth/wrong-password"){
          Alert.alert(
            'Ops.. Houve um erro',
            'A senha do usuário está incorreta',
            [              
              {text: 'OK', onPress: () => null},
            ]
          
          );
        }else if(err.code == "auth/unknown"){
          Alert.alert(
            'Ops.. Houve um erro',
            'Verifique sua conexão com a internet',
            [              
              {text: 'OK', onPress: () => null},
            ]
          
          );
        }
     //alert(err.code)
    }

  }


  async saveinfoLocal (info){
    try {
      await AsyncStorage.setItem('UsuarioInfo', JSON.stringify(info));
      
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }


  render() {
    return (

      <ImageBackground
      source={require('../img/background.png')}
      imageStyle={{resizeMode:'stretch'}}
      style={{
        flex:1
      }}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>

      <View style={{justifyContent:'center', alignItems:'center', marginBottom:50}}>
      <Image
      style={{width:150, height:109}}
      source={require('../img/tela_login/iconAC.png')}
      />
      
      </View>
     


      <View style={styles.back_input}>
          <View style={{ height:55,width:45, backgroundColor:'#877E7E', justifyContent:'center', alignItems:'center'}}>
          <Icon name='user' size={35} color='#FFF'/> 
          </View>

          <TextInput 
            style={styles.input2}
            keyboardType='email-address'
            autoCapitalize={'none'}
            placeholder={'Digite seu email'}
            value={this.state.email}
            onChangeText={email => {this.setState({email})}}
            />
      </View>


      <View style={styles.back_input}>
          <View style={{ height:55,width:45, backgroundColor:'#877E7E', justifyContent:'center', alignItems:'center'}}>
          <Icon name='lock' size={35} color='#FFF'/> 
          </View>

          <TextInput 
          style={styles.input2}
          secureTextEntry={true}
          autoCapitalize={'none'}
          placeholder={'Digite sua senha'}
          value={this.state.password}
          onChangeText={password => {this.setState({password})}}
          />
      </View>
  
      <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
      

      <TouchableOpacity style={styles.button_cadastro} onPress={() => {this.props.navigation.navigate('Cadastro')}}>
          <Text style={styles.textButton}>Cadastre-se</Text>
      </TouchableOpacity>
      </View>

      </TouchableWithoutFeedback>

      <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.isModalVisible==1}>
      <ActivityIndicator size="large" color="dodgerblue" />
      
      </Modal>
      
      </ImageBackground>
      
      
      
    );
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    //paddingHorizontal:20
  },
  back_input:{
    height:55,
    width:'100%',
    paddingHorizontal:20,
  // backgroundColor:'#000',
   //borderColor:'#EEE',
    //borderWidth:1,
    flexDirection:'row',
    marginBottom:10
   

  },
  input:{
    height:45,
    backgroundColor:'#fff',
    alignSelf:'stretch',
    borderColor:'#EEE',
    borderWidth:1,
    paddingHorizontal:20,
    marginBottom:10
  },

  input2:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignSelf:'stretch',
    borderColor:'#C2D7FF',
    borderTopWidth:5,
    borderBottomWidth:5,
    borderRightWidth:5,
    paddingHorizontal:20,
    //marginBottom:10
  },

  button:{
    alignItems:'center',
    justifyContent:'center',
    height:45,
    backgroundColor:'#00008B',
    borderRadius:5,
    alignSelf:'stretch',
    paddingHorizontal:20,
    marginHorizontal:20,
    marginTop:10
  },
  button_cadastro:{
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    marginTop:20

  },
  textButton:{
    color:'#fff',
    fontWeight:'bold'

  }
})

