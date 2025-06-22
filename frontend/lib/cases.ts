
export interface Case {
  id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'urgent' | 'resolved';
  reportedBy: string;
  reportedAt: Date;
  lastSeen: Date;
  contactPhone?: string;
  contactEmail?: string;
  images?: string[];
  tags?: string[];
}

export interface CaseFilters {
  status?: string;
  location?: string;
  ageRange?: { min: number; max: number };
  dateRange?: { start: Date; end: Date };
}

// Datos mock para desarrollo
const mockCases: Case[] = [
  {
    id: '1',
    name: 'María González',
    age: 8,
    gender: 'female',
    description: 'Niña de 8 años desaparecida en el centro comercial. Última vez vista en la tienda de juguetes.',
    location: 'Centro Comercial Plaza Norte',
    latitude: 19.4326,
    longitude: -99.1332,
    status: 'urgent',
    reportedBy: 'user-1',
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 horas atrás
    contactPhone: '+52 55 1234 5678',
    contactEmail: 'maria.gonzalez@email.com',
    images: [],
    tags: ['centro comercial', 'tienda de juguetes']
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    age: 12,
    gender: 'male',
    description: 'Niño de 12 años visto por última vez en el parque. Llevaba camiseta azul y jeans.',
    location: 'Parque Central',
    latitude: 19.4426,
    longitude: -99.1432,
    status: 'active',
    reportedBy: 'user-2',
    reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 día atrás
    lastSeen: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 horas atrás
    contactPhone: '+52 55 8765 4321',
    contactEmail: 'carlos.rodriguez@email.com',
    images: [],
    tags: ['parque', 'camiseta azul']
  },
  {
    id: '3',
    name: 'Ana Martínez',
    age: 10,
    gender: 'female',
    description: 'Niña encontrada en casa de una amiga. Caso resuelto exitosamente.',
    location: 'Escuela Primaria',
    latitude: 19.4226,
    longitude: -99.1232,
    status: 'resolved',
    reportedBy: 'user-3',
    reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
    lastSeen: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 días atrás
    contactPhone: '+52 55 5555 5555',
    contactEmail: 'ana.martinez@email.com',
    images: [],
    tags: ['escuela', 'resuelto']
  }
];

// Crear un nuevo caso
export const createCase = async (caseData: Omit<Case, 'id' | 'reportedAt'>) => {
  try {
    const newCase: Case = {
      ...caseData,
      id: Date.now().toString(),
      reportedAt: new Date(),
    };
    
    mockCases.push(newCase);
    console.log('Caso creado:', newCase);
    return newCase;
  } catch (error) {
    console.error('Error creating case:', error);
    throw error;
  }
};

// Obtener todos los casos
export const getCases = async (filters?: CaseFilters) => {
  try {
    let filteredCases = [...mockCases];
    
    if (filters?.status) {
      filteredCases = filteredCases.filter(c => c.status === filters.status);
    }
    
    if (filters?.location) {
      filteredCases = filteredCases.filter(c => 
        c.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    // Ordenar por fecha de reporte (más reciente primero)
    filteredCases.sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime());
    
    return filteredCases;
  } catch (error) {
    console.error('Error getting cases:', error);
    throw error;
  }
};

// Obtener un caso específico
export const getCase = async (id: string) => {
  try {
    const caseItem = mockCases.find(c => c.id === id);
    if (caseItem) {
      return caseItem;
    } else {
      throw new Error('Case not found');
    }
  } catch (error) {
    console.error('Error getting case:', error);
    throw error;
  }
};

// Actualizar un caso
export const updateCase = async (id: string, updates: Partial<Case>) => {
  try {
    const index = mockCases.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCases[index] = { ...mockCases[index], ...updates };
      return mockCases[index];
    } else {
      throw new Error('Case not found');
    }
  } catch (error) {
    console.error('Error updating case:', error);
    throw error;
  }
};

// Eliminar un caso
export const deleteCase = async (id: string) => {
  try {
    const index = mockCases.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCases.splice(index, 1);
      return true;
    } else {
      throw new Error('Case not found');
    }
  } catch (error) {
    console.error('Error deleting case:', error);
    throw error;
  }
};

// Obtener casos urgentes
export const getUrgentCases = async () => {
  try {
    const urgentCases = mockCases
      .filter(c => c.status === 'urgent')
      .sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime())
      .slice(0, 10);
    
    return urgentCases;
  } catch (error) {
    console.error('Error getting urgent cases:', error);
    throw error;
  }
};

// Buscar casos por texto
export const searchCases = async (searchTerm: string) => {
  try {
    const searchResults = mockCases.filter(caseItem => 
      caseItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return searchResults.sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime());
  } catch (error) {
    console.error('Error searching cases:', error);
    throw error;
  }
}; 