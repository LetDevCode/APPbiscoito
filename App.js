import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      textoFrase: '',
      img: require('./assets/biscoito.png'),
      podeQuebrar: true
    };

    this.quebraBiscoito = this.quebraBiscoito.bind(this);

    this.frases = [
      'Siga os bons e aprenda com eles.', 
      'O bom-senso vale mais do que muito conhecimento.', 
      'O riso é a menor distância entre duas pessoas.', 
      'Deixe de lado as preocupações e seja feliz.',
      'Realize o óbvio, pense no improvável e conquiste o impossível.',
      'Acredite em milagres, mas não dependa deles.',
      'A maior barreira para o sucesso é o medo do fracasso.',
      'Grandes oportunidades estão por vir.',
      'Você vai alcançar seus objetivos.',
      'Hoje será um dia incrível.'
    ];
  }

  async componentDidMount(){
    const ultimo = await AsyncStorage.getItem('ultimoBiscoito');

    if (ultimo !== null) {
      const agora = new Date();
      const ultimoData = new Date(parseInt(ultimo));
      const diferenca = (agora - ultimoData) / 1000 / 60 / 60;

      if (diferenca < 6) {
        this.setState({ podeQuebrar: false });
      }
    }
  }

  async quebraBiscoito(){

    if (!this.state.podeQuebrar) return;

    let numeroAleatorio = Math.floor(Math.random() * this.frases.length );

    this.setState({
      textoFrase: ' "' + this.frases[numeroAleatorio] + '" ',
      img: require('./assets/biscoitoAberto.png'),
      podeQuebrar: false
    });

    await AsyncStorage.setItem('ultimoBiscoito', Date.now().toString());
  }

  render(){
    return(
      <View style={styles.container} > 
      
      <Image
        source={this.state.img}
        style={styles.img}
      />

      <Text style={styles.textoFrase}>{this.state.textoFrase}</Text>

      <TouchableOpacity 
        style={[
          styles.botao,
          { opacity: this.state.podeQuebrar ? 1 : 0.5 }
        ]}
        onPress={this.quebraBiscoito}
        disabled={!this.state.podeQuebrar}
      >
        <View style={styles.btnArea}>
          <Text style={styles.btnTexto}>
            {this.state.podeQuebrar ? "Quebrar Biscoito" : "Aguarde 6h"}
          </Text>
        </View>
      </TouchableOpacity>  

      </View>    
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img:{
    width: 250,
    height: 250,
  },
  textoFrase:{
    fontSize: 20,
    margin: 30,
    textAlign: 'center'
  },
  botao:{
    width: 230,
    height: 50,
    borderWidth: 2,
    borderRadius: 25 
  },
  btnArea:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTexto:{
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default App;