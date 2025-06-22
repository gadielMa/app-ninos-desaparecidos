import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface CaseItem {
  id: number;
  name: string;
  age: number;
  latitude: number;
  longitude: number;
  status: string;
  description: string;
  location: string;
  date: string;
}

export default function MapScreen() {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  const mockCases = [
    {
      id: 1,
      name: 'María González',
      age: 8,
      latitude: 19.4326,
      longitude: -99.1332,
      status: 'urgent',
      description: 'Niña de 8 años desaparecida en el centro comercial.',
      location: 'Centro Comercial Plaza Norte',
      date: 'Hace 2 horas',
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      age: 12,
      latitude: 19.4426,
      longitude: -99.1432,
      status: 'active',
      description: 'Niño de 12 años visto por última vez en el parque.',
      location: 'Parque Central',
      date: 'Hace 1 día',
    },
    {
      id: 3,
      name: 'Ana Martínez',
      age: 10,
      latitude: 19.4226,
      longitude: -99.1232,
      status: 'resolved',
      description: 'Niña encontrada en casa de una amiga.',
      location: 'Escuela Primaria',
      date: 'Hace 3 días',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return '#FF3B30';
      case 'active': return '#007AFF';
      case 'resolved': return '#34C759';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'urgent': return 'Urgente';
      case 'active': return 'Activo';
      case 'resolved': return 'Resuelto';
      default: return 'Desconocido';
    }
  };

  const handleMyLocation = () => {
    Alert.alert(
      'Mi Ubicación',
      '¿Deseas centrar el mapa en tu ubicación actual?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Centrar', 
          onPress: () => {
            console.log('Centrando en ubicación actual');
          }
        }
      ]
    );
  };

  const handleAddCase = () => {
    Alert.alert(
      'Agregar Caso',
      '¿Deseas reportar un nuevo caso en esta ubicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reportar', onPress: () => console.log('Abriendo formulario') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa de Casos</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleMyLocation}>
            <Ionicons name="locate" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleAddCase}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={80} color="#ccc" />
        <Text style={styles.mapPlaceholderText}>
          {Platform.OS === 'web' ? 'Mapa no disponible en web' : 'Mapa interactivo'}
        </Text>
        <Text style={styles.mapPlaceholderSubtext}>
          {Platform.OS === 'web' 
            ? 'Usa la aplicación móvil para ver el mapa interactivo'
            : 'Toca los marcadores para ver detalles'
          }
        </Text>
      </View>

      {/* Cases List */}
      <View style={styles.casesSection}>
        <Text style={styles.sectionTitle}>Casos en esta área</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.casesScroll}>
          {mockCases.map((caseItem) => (
            <TouchableOpacity
              key={caseItem.id}
              style={styles.caseCard}
              onPress={() => setSelectedCase(caseItem)}
            >
              <View style={styles.caseCardHeader}>
                <Text style={styles.caseCardName}>{caseItem.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(caseItem.status) }]}>
                  <Text style={styles.statusBadgeText}>{getStatusText(caseItem.status)}</Text>
                </View>
              </View>
              <Text style={styles.caseCardAge}>{caseItem.age} años</Text>
              <Text style={styles.caseCardLocation}>{caseItem.location}</Text>
              <Text style={styles.caseCardDate}>{caseItem.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Leyenda</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF3B30' }]} />
            <Text style={styles.legendText}>Urgente</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#007AFF' }]} />
            <Text style={styles.legendText}>Activo</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
            <Text style={styles.legendText}>Resuelto</Text>
          </View>
        </View>
      </View>

      {/* Case Details Modal */}
      {selectedCase && (
        <View style={styles.caseModal}>
          <View style={styles.caseModalContent}>
            <View style={styles.caseModalHeader}>
              <Text style={styles.caseModalTitle}>{selectedCase.name}</Text>
              <TouchableOpacity onPress={() => setSelectedCase(null)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.caseModalAge}>{selectedCase.age} años</Text>
            <Text style={styles.caseModalDescription}>{selectedCase.description}</Text>
            <View style={styles.caseModalLocation}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.caseModalLocationText}>{selectedCase.location}</Text>
            </View>
            <Text style={styles.caseModalDate}>{selectedCase.date}</Text>
            <TouchableOpacity style={styles.caseModalButton}>
              <Text style={styles.caseModalButtonText}>Ver Detalles Completos</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
    padding: 8,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 40,
  },
  mapPlaceholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  mapPlaceholderSubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  casesSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  casesScroll: {
    flexDirection: 'row',
  },
  caseCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  caseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  caseCardAge: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  caseCardLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  caseCardDate: {
    fontSize: 11,
    color: '#999',
  },
  legend: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  caseModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  caseModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  caseModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  caseModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  caseModalAge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  caseModalDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  caseModalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseModalLocationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  caseModalDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  caseModalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  caseModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 