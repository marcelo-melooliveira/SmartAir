import React, {Component} from 'react';
import { View,StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Image
 } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import WifiManager from "react-native-wifi-reborn";
import api from '../services/api';
import {connect} from 'react-redux';
import {nome_blaster, uid_usuario} from '../actions/InfoUsuarioAction';

class Serial_Produto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blaster: "",
      serial1:'',
      serial2:'',
      isModalVisible:0,
    };
  }
  componentDidMount(){
      let aux = [];
     let aux2 = this.props.navigation.getParam('serial', 'Serial não lido')
     aux = aux2.split('-');
     if(aux.length == 2){
       this.setState({serial1: aux[0], serial2: aux[1]})
     }
  }
   
conectar = async () =>{

     let aux = await AsyncStorage.getItem('UsuarioInfo') || null;
     let dados = JSON.parse(aux);
     let id_user =  dados.uid;
     this.props.uid_usuario(id_user);

     if(id_user){

      const response  = await api.post("verifica-blaster", {
        blaster: "SmartAir-001", //QRlido ou inserido
        uid:id_user
      });

      if(response.data.verifica == false){

        this.props.nome_blaster(`${this.state.serial1}-${this.state.serial2}`)
         alert("admin foi criado");
         this.props.navigation.navigate('ListaRedesWifi');
         
       }else{
        alert("admin já existente");
       this.props.navigation.navigate('InsereProduto');
       //this.props.navigation.navigate('ListaRedesWifi');
       }

     }


 

  
  

  /*
  
  WifiManager.connectToProtectedSSID('M2R2', 'crjlcmam', false).then(() => {
      //alert("Connected successfully!");

      /*
      WifiManager.getCurrentWifiSSID().then( ssid => {
          alert("Você está conectado na rede:  " + ssid);
        },
    
        () => {
          alert("Cannot get current SSID!");
        }
      ); //fechar aqui o coemntario dps
      this.props.navigation.navigate('ListaRedesWifi');

         },
    () => {
      alert("Connection failed!");
    }
  ); 

*/
  
}


async getinfo (){
  let dados = [];
  let id_user = "";
  let aux = [];
  
    aux = await AsyncStorage.getItem('UsuarioInfo') || null;
     dados = JSON.parse(aux);
    //console.log(dados.uid);
    id_user = dados.uid;
   // alert(id_user)
 
  return id_user;
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

     <View style={{width:'100%', height:50, backgroundColor:'#3850CE', justifyContent:'center'}}>
        <Text style={{color:'#FFF', fontWeight:'bold', fontSize:18, marginLeft:10}}>NÚMERO SERIAL</Text>
     </View>

     

      <View style={styles.container}>
      <View style={{justifyContent:'center', alignItems:'center', marginBottom:10}}>
     <Image
     style={{width:120, height:88}}
     source={require('../img/tela_login/iconAC.png')}
     />
     
     </View>

        <View style={{width:'100%', height:100, justifyContent:'center',alignItems:'center', paddingLeft:10}}>
            <Text style={{fontWeight:'bold', fontSize:15, color:'#FFF'}}>Insira o serial do seu Smart Air</Text>
        </View>

        <View style={{width:'100%', height:60, justifyContent:'center', flexDirection:'row', paddingHorizontal:15}}>
              <TextInput 
              style={styles.input}
              fontSize={20}
              fontWeight={'bold'}
              textAlign={'center'}
              secureTextEntry={false}
              autoCapitalize={'none'}
              placeholder={'Primeiros 4 dígitos'}
              value={this.state.serial1}
              onChangeText={serial1 => {this.setState({serial1})}}
              />
              <View style={{height:60, justifyContent:'center'}}>
              <Text style={{fontWeight:'bold', fontSize:30, color:'#FFF'}}> - </Text>
              </View>
              
              <TextInput 
              style={styles.input}
              fontSize={20}
              fontWeight={'bold'}
              textAlign={'center'}
              secureTextEntry={false}
              autoCapitalize={'none'}
              placeholder={'Últimos 4 dígitos'}
              value={this.state.serial2}
              onChangeText={serial2 => this.setState({serial2})}
              />
        </View>
        

        <TouchableOpacity style={styles.button} onPress={this.conectar}>
          <Text style={styles.textButton}>Adicionar</Text>
      </TouchableOpacity>

      </View>
     
      
      <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.isModalVisible==1}>
      <ActivityIndicator size="large" color="dodgerblue" />
      
      </Modal>
      </ImageBackground>
      
      
      
    );
  }
  
}


mapStateToProps = state =>(
  {
      //bacia: state.AutenticacaoReducer.bacia
  }
)

export default connect(mapStateToProps, {nome_blaster, uid_usuario})(Serial_Produto)


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    //paddingHorizontal:20
  },
  produto:{
    width:200,
    height:200,
    backgroundColor:'#FFF',
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
    marginTop:15
  },
  textButton:{
    color:'#FFF',
    fontWeight:'bold'
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
  input:{
    flex:1,
    backgroundColor:'#fff',
    color:'#AAA',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'stretch',
    borderColor:'#C2D7FF',
    borderTopWidth:5,
    borderBottomWidth:5,
    borderRightWidth:5,
    paddingHorizontal:15,
    //marginBottom:10
  },
})

