import React from 'react';
import {
  RefreshControl, StyleSheet, Text, SafeAreaView, Image, View, FlatList, Dimensions, ToastAndroid
} from 'react-native';

//const enappdIcon = require('./assets/enappd.jpg');
const widthConst = Dimensions.get('screen').width;

export default function App() {
  const IMAGES = {
    "image1": require('./assets/1.jpg'), 
    "image2": require('./assets/2.jpg'), 
    "image3": require('./assets/3.jpg'), 
    "image4": require('./assets/4.jpg'), 
    "image5": require('./assets/5.jpg'), 
    "image6": require('./assets/6.jpg'), 
    "image7": require('./assets/7.jpg'), 
    "image8": require('./assets/8.jpg'),
  }
  const initialData = [
    {
      "id": "person1",
      "title": "Rachel Will",
      "image": "1"
    },
    {
      "id": "person2",
      "title": "Emma Huston",
      "image": "2"
    },    
  ];

  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(initialData);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (listData.length < 8) {
      try {
        let response = await fetch(
          'https://run.mocky.io/v3/90fb3583-5643-4190-83be-5cd0e9d297bf',
        );
        let responseJson = await response.json();
        console.log(responseJson);
        setListData(responseJson.result.concat(initialData));
        setRefreshing(false)
      } catch (error) {
        console.error(error);
      }
    }
    else{
      ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false)
    }
  }, [refreshing]);

  function Item({ title, image }) {
    return (
      <View style={styles.item}>
        <Image source={IMAGES['image' + image]} style={styles.thumbnail} />
        <Text style={styles.itemText}>{title}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listData}
        renderItem={({ item }) => <Item title={item.title} image={item.image} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />     
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  scrollView: {
    flex: 1, backgroundColor: '#eeeeee',
  },
  list: {
    alignItems: 'flex-start', justifyContent: 'flex-start', width: widthConst, flex: 1
  },
  enappdWrapper: {
    position: 'absolute',  bottom: 0
  },
  enappdIcon: {
    width: 100, height: 40
  },
  item: {
    flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 20
  },
  thumbnail: {
    width: 60, height: 60, borderWidth: 1, borderColor: '#aaa'
  },
  itemText: {
    paddingTop: 5, paddingLeft: 10, fontSize: 18
  }
});