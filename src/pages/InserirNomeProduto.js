import React, {Component} from 'react';
import { View,StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground
 } from 'react-native';

 import {connect} from 'react-redux';


// import { Container } from './styles';

 class InserirNomeProduto extends Component {
  render() {
    return( 
        <ImageBackground
      source={require('../img/background.png')}
      imageStyle={{resizeMode:'stretch'}}
      style={{
        flex:1
      }}
      >
      <View style={styles.container}>
        <Text>Pagina configuração controle remoto</Text>
        <Text>{this.props.nome}</Text>
        </View>
      
      </ImageBackground>
        
        );
  }
}


const mapStateToProps = store => ({
  nome: store.InfoUsuarioReducer.nome
});

export default connect(mapStateToProps)(InserirNomeProduto);

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    
      
    }
  })
