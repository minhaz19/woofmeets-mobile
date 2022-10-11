import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '../../../constants/WindowSize';


const AllProviderLoader = () => {
    const data = [
        { id: 1, x: 0, y: 40},
        { id: 2,  x: 0, y: 200},
        { id: 3,  x: 0, y: 360},
        { id: 4,  x: 0, y: 520},
        { id: 5,  x: 0, y: 680},
        { id: 6,  x: 0, y: 840},
        { id: 7,  x: 0, y: 1000},
      ];
    return (
        <ScrollView>
            <View style={{flex: 1}}>
                <ContentLoader
                    speed={1}
                    width={SCREEN_WIDTH - 24}
                    height={1280}
                    viewBox="20 -20 300 1280"
                    backgroundColor="#e3e3e3"
                    foregroundColor="#D3D3D3"
                >
                    <Rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
                    {data.map(item => (
                        <Rect x={item.x} y={item.y} rx="10" ry="10" width={SCREEN_WIDTH - 50} height="140" />
                    ))}
                </ContentLoader>
            </View>
        </ScrollView>
    )
}


export default AllProviderLoader;
