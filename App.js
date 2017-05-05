import React, {Component} from 'react';
import Expo from 'expo';
import {StatusBar, Modal, Image, BackAndroid } from 'react-native';
import {
  Container,
  Header,
  Item,
  Icon,
  Input,
  Button,
  Text,
  Content,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Thumbnail,
  Spinner,
  View,
  Card,
  CardItem,
  H3
} from 'native-base';

import styles from './styles';

StatusBar.setTranslucent(false);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoading: false,
      isModalVisible: false,
      search: '',
      results: {
        items: []
      },
      selectedItem: undefined
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({'Roboto': require('native-base/Fonts/Roboto.ttf'), 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')});
    this.setState({isReady: true});
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => { this.backHandler() });
  }

  componentWillUnmount() {
    BackAndroid.removeEventHandler('hardwareBackPress', () => { this.backHandler() });
  }

  search() {
    this.setState({isLoading: true});

    return fetch('https://api.github.com/search/repositories?q=' + this.state.search).then((response) => response.json()).then((responseJson) => {
      this.setState({results: responseJson, isLoading: false});
    }).catch((error) => {
      this.setState({isLoading: false});
      console.log(error);
    });
  }

  setModalVisible(isVisible, selectedItem) {
    this.setState({
      isModalVisible: isVisible,
      selectedItem: selectedItem
    });
  }

  backHandler() {
    if (this.state.isModalVisible) {
      this.setModalVisible(false, undefined);
      return true;
    }
    return false;
  }

  render() {
    if (!this.state.isReady) {
      return (<Expo.AppLoading/>);
    }

    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search"/>
            <Input placeholder="Search" value={this.state.search} onChangeText={(text) => this.setState({search: text})} onSubmitEditing={() => this.search()}/>
          </Item>
          <Button transparent onPress={() => this.search()}>
            <Text>Go</Text>
          </Button>
        </Header>
        <Content>
          { this.state.isLoading ? <Spinner/> :
            <List dataArray={this.state.results.items} renderRow={(item) => <ListItem button onPress={() => this.setModalVisible(true, item)}>
              <Thumbnail square size={80} source={{
                uri: item.owner.avatar_url
              }}/>
              <Body>
                <Text>Name: <Text style={styles.name}>{item.name}</Text></Text>
                <Text style={styles.fullName}>{item.full_name}</Text>
                <Text note>Score: <Text note style={styles.score}>{item.score.toString()}</Text></Text>
              </Body>
            </ListItem>}/>
          }
          <Modal animationType="slide" transparent={false} visible={ this.state.isModalVisible } onRequestClose={() => {}}>
              { !this.state.selectedItem ? <View /> :
                <Card style={ styles.card }>
                  <CardItem style={ styles.cardItemImage }>
                    <Image style={ styles.modalImage } source={{ uri: this.state.selectedItem.owner.avatar_url }}/>
                  </CardItem>
                  <CardItem style={ styles.cardItem } >
                    <Left>
                      <Body>
                        <H3 style={ styles.header }> { this.state.selectedItem.name } </H3>
                        <Text>
                          Type: <Text style={ styles.bold }>{this.state.selectedItem.owner.type}</Text>
                        </Text>
                        <Text>
                          Stars: <Text style={ styles.bold }>{this.state.selectedItem.stargazers_count.toString()}</Text>
                        </Text>
                        <Text>
                          Language: <Text style={ styles.bold }>{this.state.selectedItem.language}</Text>
                        </Text>
                        <Text>
                          Open Issues: <Text style={ styles.bold }>{this.state.selectedItem.open_issues_count.toString()}</Text>
                        </Text>
                        <Text>
                          Last Updated: <Text style={ styles.bold }>{this.state.selectedItem.updated_at.slice(0,10).toString()}</Text>
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem style={ styles.cardItem } >
                    <Right>
                      <Button primary style={ styles.backButton } onPress={() => { this.backHandler() }}>
                        <Text>Go Back</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              }
          </Modal>
        </Content>
      </Container>
    );
  }
}
