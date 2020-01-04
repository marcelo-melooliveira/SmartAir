import React, {Component} from 'react';
import { View,StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  ScrollView
 } from 'react-native';

import Modal from 'react-native-modal';
import WifiManager from "react-native-wifi-reborn";

export default class ListaRedesWifi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redes:[],
      nome_rede:'',
      password:'',
      refreshing: false,
      isModalVisible:0,
      loading:true
    };
  }
 
  componentDidMount(){

   this.lista_wifi();

   

  }
  
async lista_wifi(){

   
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Acesso aos dados do Wifi',
            message:
              'É necessário permissão para a leitura das redes Wifi disponíveis',
            buttonNeutral: 'Me lembre mais tarde',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //console.log('você pode ');

          WifiManager.reScanAndLoadWifiList(
      
            wifiList => {
                let redes =[];
                let wifiArray =  JSON.parse(wifiList);
                wifiArray.map((value, index) =>{
                redes.push(
                    
                  <View key={'page-' + index}>
                      <TouchableOpacity
                          key={'page-' + index}
                          onPress={() => {this.setState({nome_rede: value.SSID, isModalVisible:1})}}
                          style={{flexDirection:'row', paddingHorizontal:20,paddingVertical:20, borderBottomWidth:1, borderColor:'#0002'}}>
                          
                  
                                <Text style={{alignSelf:'center', marginLeft:10, fontSize:15}}>{`Rede: ${value.SSID}`}</Text> 
                  
                      </TouchableOpacity>
                  </View>
                    
                    
        
        
                    );
              
                });
        
                this.setState({redes, loading:false})
               console.log(wifiArray)
                
            },
            error =>  console.log(error)
        );


        } else {
          //console.log('Camera permission denied');
        }
      } catch (err) {
        //console.warn(err);
      }
  
}

enviar_conexao = () =>{

   // alert(`rede: ${this.state.nome_rede} e senha: ${this.state.password}`);
    this.props.navigation.navigate('LocalizacaoPage');
    //Enviar o 
}

  render() {

    if (this.state.loading) {
      return (
  
        <ImageBackground
        source={require('../img/background.png')}
        imageStyle={{resizeMode:'stretch'}}
        style={{
          flex:1
        }}
        >
        <View style={{width:'100%', height:50, backgroundColor:'#3850CE', justifyContent:'center'}}>
        <Text style={{color:'#FFF', fontWeight:'bold', fontSize:18, marginLeft:10}}>Redes Disponíveis</Text>
     </View>

        
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="dodgerblue" />
          <Text>Carregando Redes Disponíveis</Text>
        </View>

        </ImageBackground>

        
      )
    }


    return (

      <ImageBackground
      source={require('../img/background.png')}
      imageStyle={{resizeMode:'stretch'}}
      style={{
        flex:1
      }}
      >

     <View style={{width:'100%', height:50, backgroundColor:'#3850CE', justifyContent:'center'}}>
        <Text style={{color:'#FFF', fontWeight:'bold', fontSize:18, marginLeft:10}}>Redes Disponíveis</Text>
     </View>

     

      <View style={styles.container}>
      <View style={{justifyContent:'center', alignItems:'center', marginBottom:10, marginTop:20}}>
     <Image
     style={{width:95, height:68}}
     source={require('../img/tela_login/iconAC.png')}
     />
     </View>

     <ScrollView>
      {this.state.redes}
      </ScrollView>
     
     

     
  
            
      </View>
     
      
      <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.isModalVisible==1}>

      <View style={{height:'60%', width:'100%', backgroundColor:'#FFF', borderRadius:30}}>

        <View style={{flex:2, justifyContent:'center'}}>

            <View style={{alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold', marginTop:15}}>Rede: {this.state.nome_rede}</Text>
            
            <TextInput 
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize={'none'}
          placeholder={'Digite a senha'}
          value={this.state.password}
          onChangeText={password => {this.setState({password})}}
          />
            
            </View>
           


        </View>

        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingBottom:10}}>

        <TouchableOpacity style={styles.button_cancelar} onPress={()=> this.setState({isModalVisible:false})}>
          <Text style={styles.textButton_cancelar}>Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={this.enviar_conexao}>
          <Text style={styles.textButton}>Conectar</Text>
      </TouchableOpacity>
        </View>
        
      
      </View>
     
      
      </Modal>
      </ImageBackground>
      
      
      
    );
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
   
    //paddingHorizontal:20
  },
  container2:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
   
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
  textButton_cancelar:{
    color:'#AAA',
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
  button_cancelar:{
    alignItems:'center',
    justifyContent:'center',
    height:45,
    alignSelf:'stretch',
    paddingHorizontal:20,
    marginHorizontal:20,
    marginTop:10,
    marginBottom:25,
    borderRadius: 5,
    borderColor:'#AAA',
    borderWidth :1,
  },
  input:{
    
    height:54,
    marginTop:10,
    backgroundColor:'#fff',
    color:'#AAA',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'stretch',
    borderColor:'#C2D7FF',
    borderTopWidth:5,
    borderBottomWidth:5,
    borderRightWidth:5,
    borderLeftWidth:5,
    paddingHorizontal:15,
    marginHorizontal:10
    //marginBottom:10
  },
})

