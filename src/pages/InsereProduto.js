import React, {Component} from 'react';
import { View,StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert
 } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';


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
            }
          });
    
          
    
    } */

verificacao = () =>{
  auth().currentUser.sendEmailVerification().then(()=>{
    this.setState({isModalVisible:0});

})
}

 

seleciona =  () =>{
  
this.setState({isModalVisible:1})
 let user3 = auth().currentUser;
  user3.updateProfile({
    photoURL: "ok",
  }).then(async () =>{
    let user4 = auth().currentUser;
   //console.log(user4.emailVerified);
   if(user4.emailVerified == true){
      //alert("email verificado")

    this.setState({isModalVisible:0})
      this.props.navigation.navigate('ScanQRcode');

   }else{
    this.setState({isModalVisible:0})
    Alert.alert(
      'Verificação pendente',
      'Caso não tenha recebido nosso email, clique em REENVIAR VERIFICAÇÃO',
      [
        
        {
          text: 'REENVIAR VERIFICAÇÃO ',
          onPress: this.verificacao,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => null},
      ]
      
    );
     //alert("email nao verificado")
   }

  
  }
)

 
}

async saveinfo (info){
  try {
    await AsyncStorage.setItem('UsuarioInfo', JSON.stringify(info));
    
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
}


async getinfo (){
  let aux = [];
  try {
    aux = await AsyncStorage.getItem('UsuarioInfo') || null;
    let parse = JSON.parse(aux);
    console.log(parse);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
 // return parse;
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
        <Text style={{color:'#FFF', fontWeight:'bold', fontSize:18, marginLeft:10}}>PRODUTOS</Text>
     </View>

      <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        <TouchableOpacity onPress={this.seleciona}>
            <View style={styles.produto}>
            <Image
            style={{width:90, height:90}}
            source={require('../img/tela_produtos/router.png')}
            /> 
            <Text style={styles.textButton}>Smart Air</Text>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => null}>
        <View style={styles.produto}>
        <Image
        style={{width:90, height:90}}
        source={require('../img/tela_produtos/router.png')}
        /> 
        <Text style={styles.textButton}>Blaster 2</Text>
        </View>
        </TouchableOpacity>

        <View style={styles.produto}>
        <Image
        style={{width:90, height:90}}
        source={require('../img/tela_produtos/router.png')}
        /> 
        <Text style={styles.textButton}>Blaster 3</Text>
        </View>

        <View style={styles.produto}>
        <Image
        style={{width:90, height:90}}
        source={require('../img/tela_produtos/router.png')}
        /> 
        <Text style={styles.textButton}>Blaster 4</Text>
        </View>

      </View>
      </ScrollView>
      
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
  }
})

