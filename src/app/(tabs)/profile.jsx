import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function Tab() {
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
    <View style={styles.container}>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
