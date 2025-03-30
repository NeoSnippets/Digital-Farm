import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditProfileScreen = () => {
  const [name, setName] = useState('Nayan Kawalkar');
  const [email, setEmail] = useState('nayan@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleChangeProfileImage = () => {
    // In a real app, you would implement image picker functionality here
    setProfileImage('https://thumbs.dreamstime.com/z/happy-african-farmer-working-countryside-holding-wood-box-fresh-vegetables-215052594.jpg');
  };

  const handleSave = () => {
    // In a real app, you would save the profile changes to your database here
    alert('Profile updated successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileInitials}>
              <Text style={styles.initialsText}>NK</Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.changeImageButton}
            onPress={handleChangeProfileImage}
          >
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileInitials: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#5B9AF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;