import React, {Component} from 'react';
import { View,StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  FlatList
 } from 'react-native';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import Search from './Search';
import api from '../services/api';
import {connect} from 'react-redux';
import {nome_local, salva_latitude, salva_longitude} from '../actions/InfoUsuarioAction';

 class LocalizacaoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:0,
      longitude:0,
      region: null,
      isModalVisible:0,
      local:''
    };
  }
 
 
  async componentDidMount() {

   
    console.log(this.props.uid);

    let isGranted = await this.requestLocationPermission();
  
    if (isGranted) {
      this.findCoordinates()
    }
  
   // this.getLocation();

  

  
  
  }

  findCoordinates () {
		 Geolocation.getCurrentPosition(
			position => {
				const location = (position);

        this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude})
				console.log(location)
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};
  
async requestLocationPermission() {
  try {

      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
              'title': 'App Location Permission',
              'message': 'Maps App needs access to your map ' +
                  'so you can be navigated.'
          }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
          return true;

      } else {
          console.log("location permission denied");
          return false;
      }

  } catch (err) {
      console.warn(err)
  }

}



getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
      let newOrigin = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      };

      //alert(position.coords.latitude);
      this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})

      
       console.log('new origin');
       console.log(newOrigin);

      this.setState({
          origin: newOrigin
      });
      

  }, (err) => {
      console.log('error');
      console.log(err)

  }, {enableHighAccuracy: true, timeout: 10000, maximumAge: 0})

};

localSelecionado = (data, { geometry })=> {

  this.setState({latitude: geometry.location.lat, longitude: geometry.location.lng})
  //console.log(geometry)

}

salvarEndereco = async () =>{

  const response  = await api.post("dados-usuario-blaster", {
    
    uid: this.props.uid,
    dados: {nome: this.state.local, blaster: "SmartAir-001", latitude: this.state.latitude, longitude: this.state.longitude}
  });

  
 //this.props.nome_local(this.state.local);
 // this.props.salva_latitude(this.state.latitude);
 // this.props.salva_longitude(this.state.salva_longitude);
  this.setState({isModalVisible:1})
  alert(response.data.salvo);
 this.props.navigation.navigate('InserirNomeProduto');
}


  render() {

    const {region} = this.state
    return (

      <ImageBackground
      source={require('../img/background.png')}
      imageStyle={{resizeMode:'stretch'}}
      style={{
        flex:1
      }}
      >

      <View style={styles.container}>

      
      <MapView
      style={styles.map}
      loadingEnabled={false}
      
      mapType='standard'
      
      region={{latitude: this.state.latitude,
        longitude:  this.state.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.02}} 
      
       >
       <MapView.Marker coordinate={{latitude: this.state.latitude,
        longitude:  this.state.longitude
        }} >

        
        <Icon name='map-marker' size={30} color='#00008B' /> 
                    
       
       
     </MapView.Marker>
       
       </MapView>
       
       <Search onLocationSelected={this.localSelecionado}/>

       <View style={{width:'100%', height:'100%', position:'absolute', justifyContent:'flex-end'}}>
       <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isModalVisible:1})}}>
       <Text style={styles.textButton}>Confirmar endereço</Text>
   </TouchableOpacity>
       </View>

       
            
      </View>

       
      <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.isModalVisible==1}>

      <View style={{height:'60%', width:'100%', backgroundColor:'#FFF', borderRadius:30}}>

        <View style={{flex:1, justifyContent:'center'}}>

            <View style={{alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold', marginTop:10}}>Nome do local</Text>
            
            <TextInput 
          style={styles.input}
          autoCapitalize={'none'}
          placeholder={'Digite o nome do local'}
          value={this.state.local}
          onChangeText={local => {this.setState({local})}}
          />
            
            </View>
           


        </View>

        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

        <TouchableOpacity style={styles.button_cancelar} onPress={()=> this.setState({isModalVisible:false})}>
          <Text style={styles.textButton_cancelar}>Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={this.salvarEndereco}>
          <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>
        </View>
        
      
      </View>
     
      
      </Modal>
     
      </ImageBackground>
     
    );
  }
  
}



const mapStateToProps = store => ({
  uid: store.InfoUsuarioReducer.uid
});

export default connect(mapStateToProps, {salva_latitude, salva_longitude, nome_local})(LocalizacaoPage)

const styles = StyleSheet.create({
  container:{
    flex:1,
  
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
    marginTop:15,
    marginBottom:25
  },
  button_cancelar:{
    alignItems:'center',
    justifyContent:'center',
    height:45,
    alignSelf:'stretch',
    paddingHorizontal:20,
    marginHorizontal:20,
    marginTop:15,
    marginBottom:25
  },
  input:{
    marginTop:0,
    marginHorizontal:10,
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
    //marginBottom:10
  },
  map: {
    flex:1,
    //position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  }
})

