import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SecurityScreen = () => {
  const [securitySettings, setSecuritySettings] = React.useState({
    biometricLogin: true,
    twoFactorAuth: false,
    rememberDevice: true,
  });

  const toggleSwitch = (key) => {
    setSecuritySettings(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="finger-print-outline" size={24} color="#333" style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Biometric Login</Text>
          </View>
          <Switch
            value={securitySettings.biometricLogin}
            onValueChange={() => toggleSwitch('biometricLogin')}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={'#fff'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#333" style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
          </View>
          <Switch
            value={securitySettings.twoFactorAuth}
            onValueChange={() => toggleSwitch('twoFactorAuth')}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={'#fff'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="laptop-outline" size={24} color="#333" style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Remember Device</Text>
          </View>
          <Switch
            value={securitySettings.rememberDevice}
            onValueChange={() => toggleSwitch('rememberDevice')}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={'#fff'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Security</Text>
        
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionLabelContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#333" style={styles.settingIcon} />
            <Text style={styles.actionLabel}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionLabelContainer}>
            <Ionicons name="log-out-outline" size={24} color="#333" style={styles.settingIcon} />
            <Text style={styles.actionLabel}>Logout from All Devices</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionLabelContainer}>
            <Ionicons name="shield-outline" size={24} color="#333" style={styles.settingIcon} />
            <Text style={styles.actionLabel}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.dangerButton}>
        <Text style={styles.dangerButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: '#FFF1F0',
    borderWidth: 1,
    borderColor: '#FF5252',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  dangerButtonText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SecurityScreen;