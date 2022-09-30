import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel'
import { course } from '../tempDB/course';

const width = Dimensions.get('window').width;

const CarouselCourse = () => {

  return (
    <View>
      <Carousel
          loop
          width={width}
          height={width / 1.6}
          autoPlay={true}
          data={course}
          scrollAnimationDuration={4000}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({item, index})=>(
            <ImageBackground 
                source={item.img}
                style={{
                    width,
                    height:width / 1.6,
                    borderRadius:7,
                    justifyContent:'flex-end',
                    paddingBottom:10
                }}
                resizeMode='cover'
            >
                <Text style={{
                    fontSize:25, 
                    color:'#000', 
                    margin:10, 
                    backgroundColor:'#ffffffbb', 
                    borderRadius:8,
                    paddingHorizontal:5,
                    paddingVertical:2
                    }}
                >
                    {item.name}
                </Text>
            </ImageBackground>
          )}
      />
    </View>
  )
}

export default CarouselCourse

const styles = StyleSheet.create({})