import { Linking, Alert } from "react-native";

// Função para enviar mensagem via WhatsApp
export async function messageWhatsApp({message, phone}) {
  try {

    const appUrl = `whatsapp://send?phone=${'+55'+ phone}&text=${message}`;

    const webUrl = `https://wa.me/55${phone}?text=${message}`;
    // Verifica se o app pode abrir a url whatsapp://
    const canOpen = await Linking.canOpenURL(appUrl);

    if (canOpen) {
      await Linking.openURL(appUrl);
    } else {
      // Abre no navegador (WhatsApp Web)
      const supported = await Linking.canOpenURL(webUrl);
      if (supported) {
        await Linking.openURL(webUrl);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o WhatsApp Web neste dispositivo.');
      }
    }
  } catch (err) {
    Alert.alert('Erro', 'Não foi possível abrir o WhatsApp neste dispositivo.');
  }
}