import Expo from 'expo';
import { Platform } from 'react-native';

export default {
  container: {
    marginTop: Expo.Constants.statusBarHeight
  },
  name: {
    color: '#46ee4b'
  },
  fullName: {
    color: '#007594'
  },
  score: {
    marginTop: 5
  },
  card: {
    paddingTop: 20
  },
  cardItem: {
    justifyContent: 'flex-start'
  },
  cardItemImage: {
    justifyContent: 'center'
  },
  modalImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200
  },
  header: {
    marginLeft: -5,
    marginTop: 5,
    marginBottom: (Platform.OS==='ios') ? -7 : 0,
    lineHeight: 24,
    color: '#5357b6'
  },
  bold: {
    fontWeight: 'bold'
  },
  backButton: {
    alignSelf: 'flex-end'
  }
};
