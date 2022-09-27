import { StyleSheet, Text, View, FlatList, Dimensions, ImageBackground } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'


const width = Dimensions.get('window').width;
let currentSlideIndex = 0;
let intervalId;

/* DB */
import {course} from '../tempDB/course';
// console.log(course);

const CarouselCourse = () => {

  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex]  = useState(0);

  const onViewableItemsChanged = useRef(({viewableItems})=>{
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50
  });

  const flatList = useRef();

  const handleScrollTo = (index) => {
    flatList.current.scrollToIndex({animated:false, index});
  }

  const startSlider = () => {
    if(currentSlideIndex <= dataToRender.length - 2) {
        intervalId = setInterval(()=>{
            flatList.current.scrollToIndex({
                animated: true,
                index: currentSlideIndex + 1
            })
        }, 4000);
    }else{
        pauseSlider();
    }
  }

  const pauseSlider = () => {
    clearInterval(intervalId);
  }

  useEffect(()=>{
    if(dataToRender.length && flatList.current) {
        startSlider();
    }
  }, [dataToRender.length]);

  useEffect(()=>{
    const newData = [[...course].pop(), ...course, [...course].shift()];
    setDataToRender([...newData]);
  }, [course.length]);

  useEffect(()=>{
    const length = dataToRender.length;
    //첫 번째 리셋
    if(visibleSlideIndex === length -1 && length) {
        handleScrollTo(1);
    }
    //마지막 페이지 리셋
    if(visibleSlideIndex === 9 && length) {
        handleScrollTo(length - 2);
    }
    const lastSlide = currentSlideIndex === length - 1;
    const firstSlide = currentSlideIndex === 0;

    if(lastSlide && length) setActiveSlideIndex(0)
    else if(firstSlide && length) setActiveSlideIndex(length - 2)
    else setActiveSlideIndex(currentSlideIndex - 1)
  }, [visibleSlideIndex])

  return (
    <View style={[sty.container, {position:'relative'}]}>
      <View 
        style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end',
            position:'absolute',
            right:0,
            top:40,
            zIndex:10
        }}
      >
        <View
          style={{
            flexDirection:'row', alignItems:'center', justifyContent:'center', paddingHorizontal: 20, marginTop:-25
          }}
        >
            {
                course.map((item, index)=>(
                    <View key={item.id}
                          style={{
                            width:12,
                            height:12,
                            borderRadius:6,
                            borderWidth:2,
                            marginRight:5,
                            backgroundColor: activeSlideIndex === index ? '#000' : 'transparent'
                          }}
                    />
                ))
            }
        </View>
      </View>

      <FlatList
        ref={flatList}
        data={dataToRender}
        keyExtractor={(item, index)=>item.id + index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index)=>({
            length: width,
            offset: width * index,
            index
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onScrollBeginDrag={pauseSlider}
        onScrollEndDrag={startSlider}
        renderItem={({item})=>(
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

const sty = StyleSheet.create({
    container:{
        alignSelf:'center',
        width,
        marginBottom:30,
        backgroundColor:'#f2f2f2'
    }
})