import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '../../constants/WindowSize';


const ServiceTypesLoader = () => {
    return (
        <ScrollView>
            <View style={{flex: 1}}>
                <ContentLoader
                    speed={1}
                    width={SCREEN_WIDTH}
                    height={200}
                    viewBox="40 -20 300 200"
                    backgroundColor="#e3e3e3"
                    foregroundColor="#D3D3D3"
                >
                    <Rect x="0" y="0" rx="4" ry="4" width="100" height="20" />

                    <Rect x={0} y={30} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 25} height="70" />
                    <Rect x={SCREEN_WIDTH/3 - 15} y={30} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 25} height="70" />
                    <Rect x={SCREEN_WIDTH/3 * 2 - 30} y={30} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 25} height="70" />

                    <Rect x={0} y={110} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 25} height="70" />
                    <Rect x={SCREEN_WIDTH/3 - 15} y={110} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 25} height="70" />
                    <Rect x={SCREEN_WIDTH/3 * 2 - 30} y={110} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 25} height="70" />

                    {/* <Rect x={0} y={190} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 30} height="70" />
                    <Rect x={SCREEN_WIDTH/3 - 20} y={190} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 30} height="70" />
                    <Rect x={SCREEN_WIDTH/3 * 2 - 40} y={190} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 30} height="70" /> */}
                </ContentLoader>
            </View>
        </ScrollView>
    )
}


export default ServiceTypesLoader;
