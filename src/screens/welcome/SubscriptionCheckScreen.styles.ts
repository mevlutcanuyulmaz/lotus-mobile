import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  header: { 
    paddingHorizontal: 32, 
    paddingTop: 10, 
    paddingBottom: 30 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#1A202C', 
    marginBottom: 12 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#718096', 
    lineHeight: 24 
  },
  optionsContainer: { 
    paddingHorizontal: 24 
  },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 20, 
    backgroundColor: '#F7FAFC', 
    borderWidth: 1, 
    borderColor: '#EDF2F7' 
  },
  primaryCard: { 
    backgroundColor: '#FAF5FF', 
    borderColor: '#E9D8FD' 
  },
  cardIconContainer: { 
    width: 56, 
    height: 56, 
    borderRadius: 16, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#805AD5', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  cardIconContainerDark: { 
    width: 56, 
    height: 56, 
    borderRadius: 16, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2 
  },
  cardIcon: { 
    fontSize: 24 
  },
  cardTextContainer: { 
    flex: 1, 
    marginLeft: 16 
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2D3748', 
    marginBottom: 4 
  },
  cardSubtitle: { 
    fontSize: 14, 
    color: '#718096' 
  },
  cardTitlePrimary: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#553C9A', 
    marginBottom: 4 
  },
  cardSubtitlePrimary: { 
    fontSize: 14, 
    color: '#805AD5' 
  },
});
