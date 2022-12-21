import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
        Foto Online
        </Text>
        
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />

        <TouchableOpacity onPress={openImagePickerAsync}>
          <Text style={styles.btnGaleria}>Selecionar imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.btnGaleria}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
       Foto Online
      </Text>
      
      <Image source={{ uri: 'https://i.pinimg.com/originals/73/da/73/73da73057a7efc32c3f94ab6449e64aa.jpg' }} style={styles.logo} />

      <TouchableOpacity onPress={openImagePickerAsync}>
        <Text style={styles.btnGaleria}>Selecionar imagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 205,
    height: 195,
    marginBottom: 20,
    borderRadius: 8,
    border: '3px solid #444',
  },
  titulo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 700,
    margin: 10,
  },
  btnGaleria: {
    textAlign: 'center',
    fontSize: 17,
    color: '#fff',
    backgroundColor: 'blue',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    borderRadius: 5,
    width: 200,
    marginBottom: 10,
  },
  thumbnail: {
    resizeMode: 'cover',
    width: 205,
    height: 205,
    marginBottom: 20,
    borderRadius: 8,
    border: '3px solid #444',
  },
});
