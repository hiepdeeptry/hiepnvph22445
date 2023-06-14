import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import User from '../assets/avatar.png'


const Test = () => {

  const [selectedImage, setSelectedImage] = useState("");

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.imageContainer} onPress={handleSelectImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Image source={User} style={styles.image} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  errorMessage: {
    color: "red",
    marginBottom: 8,
    textAlign: "left",
  },
  datePickerButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 16,
  },
  submitButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});