import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

const primaryColor = '#2c3e50';
const secondaryColor = '#3498db';
const accentColor = '#f39c12';
const backgroundColor = 'rgba(83,223,244,0.84)';
const textColorPrimary = '#222';
const textColorSecondary = '#777';
const borderColor = '#ddd';
const shadowColor = '#000';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isLargeScreen ? 60 : 40,
    paddingHorizontal: 25,
    backgroundColor: backgroundColor,
  },

  headerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },

  sectionHeader: {
    fontSize: isLargeScreen ? 24 : 20,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    color: primaryColor,
    borderLeftWidth: 5,
    borderLeftColor: accentColor,
  },

  item: {
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: borderColor,
    borderWidth: 1,
    marginVertical: 10,
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    color: textColorPrimary,
  },

  bought: {
    fontSize: 18,
    fontWeight: '600',
    color: secondaryColor,
    textDecorationLine: 'line-through',
  },

  details: {
    fontSize: 16,
    color: textColorSecondary,
    marginTop: 8,
  },

  modal: {
    flex: 1,
    padding: 35,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },

  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },

  button: {
    backgroundColor: secondaryColor,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: '48%',
    marginBottom: 12,
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 6,
  },

  input: {
    borderColor: secondaryColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    backgroundColor: '#fff',
    color: textColorPrimary,
    marginBottom: 15,
  },

  authFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    paddingHorizontal: 20,
  },

  authContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  authTitle: {
    fontSize: isLargeScreen ? 30 : 26,
    marginBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: primaryColor,
  },

  authInput: {
    borderWidth: 1,
    borderColor: secondaryColor,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 18,
    backgroundColor: '#fff',
    fontSize: 16,
    color: textColorPrimary,
  },

  authLink: {
    alignItems: 'center',
    marginTop: 20,
  },

  authLinkButton: {
    backgroundColor: accentColor,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 12,
    minWidth: 180,
    alignItems: 'center',
  },

  authLinkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  detailsTitle: {
    fontSize: isLargeScreen ? 28 : 24,
    fontWeight: 'bold',
    marginBottom: 22,
    textAlign: 'center',
    color: primaryColor,
  },

  detailsImage: {
    width: isLargeScreen ? 280 : 240,
    height: isLargeScreen ? 280 : 240,
    marginBottom: 22,
    borderRadius: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: borderColor,
  },

  detailsText: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
    color: textColorSecondary,
    lineHeight: 24,
  },

  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: borderColor,
  },
});
