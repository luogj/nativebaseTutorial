import React from 'react';
import Expo from 'expo';
import { Container, Header, Item, Icon, Input, Button, Text } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      search: ''
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ isReady: true });
  }

  search() {
    
  }

  render() {
    if (!this.state.isReady) {
      return (<Expo.AppLoading />);
    }

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search"/>
            <Input placeholder="Search" value={this.state.search} onChangeText={(text) => this.setState({ search: text })} onSubmitEditing={()=> this.search()} />
          </Item>
          <Button transparent onPress={() => this.search()}>
            <Text>Go</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}
