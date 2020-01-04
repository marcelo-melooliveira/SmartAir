import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './pages/LoginPage';
import Cadastro from './pages/CadastroPage';
import InsereProduto from './pages/InsereProduto'
import ScanQRcode from'./pages/ScanQRcode'
import SerialProduto from'./pages/SerialProduto'
import ListaRedesWifi from './pages/ListaRedesWifi'
import LocalizacaoPage from './pages/LocalizacaoPage'
import InserirNomeProduto from './pages/InserirNomeProduto'
//import Dashboard from '../pages/Dashboard';

const mainNavigation = createSwitchNavigator({
  Login,
  Cadastro,
  InsereProduto,
  ScanQRcode,
  SerialProduto,
  ListaRedesWifi,
  LocalizacaoPage,
  InserirNomeProduto
  
});

export default createAppContainer(mainNavigation);