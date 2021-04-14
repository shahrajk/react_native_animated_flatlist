import React, { useRef } from 'react';
import { View, Text, Image, StatusBar, Animated } from 'react-native';
import faker from 'faker'

faker.seed(10)

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  }
})
const SPACING = 20;
const AVATAR_SIZE = 70
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

const white = "#ffffff"
const black = '#000000'
const gray = 'rgb(211,211,211)'

export default () => {
  const scrollY = useRef(new Animated.Value(0)).current
  return (
    <View style={{ flex: 1, backgroundColor: gray }}>
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ],
          { useNativeDriver: true }
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42
        }}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]
          const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          })
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0]
          })
          return (
            <Animated.View style={{
              flexDirection: 'row',
              backgroundColor: white,
              padding: SPACING,
              marginBottom: SPACING,
              borderRadius: 12,
              shadowColor: '#fff',
              shadowOffset: {
                width: 0,
                height: 10
              },
              shadowOpacity: .3,
              shadowRadius: 20,
              transform: [{ scale }],
              opacity
            }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{ fontSize: 22, color: black, fontWeight: '700' }}>{item.name}</Text>
                <Text style={{ fontSize: 18, color: black, opacity: .7 }}>{item.jobTitle}</Text>
                <Text style={{ fontSize: 14, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
              </View>
            </Animated.View>
          )
        }}
      />
    </View>
  )
}