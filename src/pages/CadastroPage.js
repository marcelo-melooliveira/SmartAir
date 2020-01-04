import React, {Component} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text,
     ImageBackground,
     Image,
     TouchableWithoutFeedback,
     Keyboard,
     ActivityIndicator,
     Alert
   
     } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class CadastroPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome:'',
      email:'',
      password:'',
      isModalVisible:0
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
        }else{
          console.log("nao existe")
        }
      });

      

} */

  cadastro =  () =>{
    const {email, password, nome} = this.state;
    this.setState({isModalVisible:1});
    auth().createUserWithEmailAndPassword(email, password).then(()=>{
        var user = auth().currentUser;
        user.updateProfile({
            displayName: nome,
          }).then(()=>{
            const user_update =  auth().currentUser;
            //console.log(user_update);

             this.saveinfoLocal(user_update);
           
           
            user_update.sendEmailVerification().then( ()=>{
                this.salvar_db(user_update.uid, user_update.email, user_update.displayName);
              
                this.setState({isModalVisible:0});
                this.props.navigation.navigate('InsereProduto');
            })
            

          })
        
    }).catch((err) => {
      this.setState({isModalVisible:0});
      if(err.code == "auth/weak-password"){
        Alert.alert(
          'Ops.. Houve um erro',
          'A senha deve conter no mínimo 6 caracteres',
          [              
            {text: 'OK', onPress: () => null},
          ]
        
        );
      }else if(err.code == "auth/email-already-in-use"){
        Alert.alert(
          'Ops.. Houve um erro',
          'O usuário já existe',
          [              
            {text: 'OK', onPress: () => null},
          ]
        
        );

      }
     // alert(err.code)
    })
}

salvar_db = async (uid, email, nome) =>{

  const response = await api.post("criar",{
    UID: uid,
    email: email,
    nome: nome
  });
//alert(response.data);
}



async saveinfoLocal (info){
  try {
    await AsyncStorage.setItem('UsuarioInfo', JSON.stringify(info));
    
  } catch (error) {
    // Error retrieving data
   // console.log(error.message);
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

      <View style={{paddingHorizontal:10, height:45, width:'100%', justifyContent:'center'}}>

      <Icon name='arrow-left' size={25} color='#FFF' onPress={() => {this.props.navigation.navigate('Login')} }/> 

      
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <View style={styles.container}>

      <View style={{justifyContent:'center', alignItems:'center', marginBottom:50}}>
      <Image
      style={{width:120, height:88}}
      source={require('../img/tela_login/iconAC.png')}
      />
      
      </View>
     


      <View style={styles.back_input}>
          <View style={{ height:50,width:45, backgroundColor:'#877E7E', justifyContent:'center', alignItems:'center'}}>
          <Icon name='user' size={25} color='#FFF'/> 
          </View>

          <TextInput 
            style={styles.input2}
            placeholder={'Digite seu nome'}
            value={this.state.nome}
            onChangeText={nome => {this.setState({nome})}}
            />
      </View>



      <View style={styles.back_input}>
          <View style={{ height:50,width:45, backgroundColor:'#877E7E', justifyContent:'center', alignItems:'center'}}>
          <Icon name='envelope' size={25} color='#FFF'/> 
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
          <View style={{ height:50,width:45, backgroundColor:'#877E7E', justifyContent:'center', alignItems:'center'}}>
          <Icon name='lock' size={25} color='#FFF'/> 
          </View>

          <TextInput 
          style={styles.input2}
          placeholder={'Digite sua senha'}
          value={this.state.password}
          onChangeText={password => {this.setState({password})}}
          />
      </View>

      
      
      
     
  
      <TouchableOpacity style={styles.button} onPress={this.cadastro}>
          <Text style={styles.textButton}>Cadastrar</Text>
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
    marginTop:30

  },
  textButton:{
    color:'#fff',
    fontWeight:'bold'

  }
})

