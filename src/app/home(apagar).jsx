import { Text, View, Alert } from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

import Button from '../components/button';

export default function App() {
  const {setAuth} = useAuth();

  async function handleSignOut() {    
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
  }

  return (
    <View>
      <Text style={{ textAlign: 'center', alignItems: 'center' }}>Home</Text>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  )
}