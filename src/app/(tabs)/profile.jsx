import { View, Text, StyleSheet, Image } from 'react-native';

import Button from '../../components/button';
import ItemProfile from '../../components/itemProfile/itemProfile';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import colors from '../../constants/theme';

export default function Tab() {
    const {setAuth, user} = useAuth();
    
  
    async function handleSignOut() {    
      const { error } = await supabase.auth.signOut();
      setAuth(null);
  
      if (error) {
        Alert.alert('Error', error.message);
        return;
      }
    }
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image source={require('../../assets/user.png')} style={styles.img} />
        <Text style={styles.title}>Salão da Neide</Text>
      </View>
      <ItemProfile iconName="mail" text="teste@gmail.com" />
      <ItemProfile iconName="home" text="Rua Atleta Ademar - 999" />
      <ItemProfile iconName="mail" text="Cruzeiro do Oeste - PR" />
      <ItemProfile iconName="call" text="(44) 9 99999-9999" />
      <Button title="Editar" onPress={handleSignOut} btnStyle={{marginTop: 50}}/>
      <Button title="Sair do App" onPress={handleSignOut} btnStyle={{backgroundColor: colors.grayLight}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  img:{
    width: 120,
    height: 120,
    borderRadius: 60,
  }, 
  containerImg:{
    width: "100%",
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 28,
    flexDirection: 'row',
    marginBottom:24
  }, 
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft:18,
  }
});
