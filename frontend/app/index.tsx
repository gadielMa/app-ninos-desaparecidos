import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Index() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  const handleEmergencyCall = () => {
    Alert.alert(
      'Línea de Emergencia',
      '¿Deseas llamar a la línea de emergencia para reportar un caso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => console.log('Llamando a emergencias') }
      ]
    );
  };

  const handleReportCase = () => {
    router.push('/report');
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'search':
        router.push('/search');
        break;
      case 'map':
        router.push('/map');
        break;
      case 'profile':
        router.push('/profile');
        break;
      default:
        // Stay on home
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Niños Desaparecidos</Text>
        <Text style={styles.headerSubtitle}>Ayudando a encontrarlos</Text>
      </View>

      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
        <Ionicons name="call" size={24} color="white" />
        <Text style={styles.emergencyButtonText}>EMERGENCIA</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleReportCase}>
              <Ionicons name="add-circle" size={32} color="#007AFF" />
              <Text style={styles.actionText}>Reportar Caso</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={() => handleNavigation('search')}>
              <Ionicons name="search" size={32} color="#007AFF" />
              <Text style={styles.actionText}>Buscar Casos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={() => handleNavigation('map')}>
              <Ionicons name="map" size={32} color="#007AFF" />
              <Text style={styles.actionText}>Ver Mapa</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="information-circle" size={32} color="#007AFF" />
              <Text style={styles.actionText}>Información</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Cases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Casos Recientes</Text>
          <View style={styles.caseCard}>
            <View style={styles.caseHeader}>
              <Text style={styles.caseName}>María González</Text>
              <Text style={styles.caseDate}>Hace 2 horas</Text>
            </View>
            <Text style={styles.caseDescription}>
              Niña de 8 años desaparecida en el centro comercial. Última vez vista en la tienda de juguetes.
            </Text>
            <View style={styles.caseLocation}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.locationText}>Centro Comercial Plaza Norte</Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Casos Activos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>127</Text>
              <Text style={styles.statLabel}>Casos Resueltos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24h</Text>
              <Text style={styles.statLabel}>Tiempo Promedio</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => handleNavigation('home')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color="#007AFF" 
          />
          <Text style={[styles.navText, styles.navTextActive]}>
            Inicio
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('search')}
        >
          <Ionicons 
            name="search" 
            size={24} 
            color="#666" 
          />
          <Text style={styles.navText}>
            Buscar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('map')}
        >
          <Ionicons 
            name="map" 
            size={24} 
            color="#666" 
          />
          <Text style={styles.navText}>
            Mapa
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('profile')}
        >
          <Ionicons 
            name="person" 
            size={24} 
            color="#666" 
          />
          <Text style={styles.navText}>
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  caseCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  caseDate: {
    fontSize: 12,
    color: '#666',
  },
  caseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  caseLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    // Active state styling
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    color: '#007AFF',
    fontWeight: '500',
  },
});
