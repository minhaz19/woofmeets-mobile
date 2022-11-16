import { ScrollView } from 'react-native'
import React from 'react'
import DescriptionText from '../../../components/common/text/DescriptionText';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import ScreenRapper from '../../../components/common/ScreenRapper';

const AboutProvider = (props: { route: { params: { description: { description: string; }[]; }; }; }) => {
    console.log(props.route.params.description);
  return (
    <ScreenRapper>
      <ScrollView style={{padding: '5%', paddingBottom: 100}}>
      {props.route.params.description && (
        <>
           <DescriptionText
            textStyle={{
                color: Colors.text,
                fontSize: Text_Size.Text_9,
            }}
            text={props.route.params.description[0].longDescription}
            />
        </>
        )}
      </ScrollView>
    </ScreenRapper>
  )
}

export default AboutProvider