'use strict';
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) {
      return mod;
    }
    var result = {};
    if (mod != null) {
      for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) {
          result[k] = mod[k];
        }
      }
    }
    result.default = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';

Object.defineProperty(exports, '__esModule', {value: true});
const React = __importStar(require('react'));
const react_native_1 = require('react-native');
const merge_extradata_1 = __importDefault(require('./merge-extradata'));
const windowWidth = Dimensions.get('window').width;
const isAndroidRTL =
  react_native_1.I18nManager.isRTL && react_native_1.Platform.OS === 'android';
class AppIntroSlider extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      width: 0,
      height: 0,
      activeIndex: 0,
    };
    this.goToSlide = (pageNum, triggerOnSlideChange) => {
      const prevNum = this.state.activeIndex;
      this.setState({activeIndex: pageNum});
      this.flatList?.scrollToOffset({
        offset: this._rtlSafeIndex(pageNum) * this.state.width,
      });
      if (triggerOnSlideChange && this.props.onSlideChange) {
        this.props.onSlideChange(pageNum, prevNum);
      }
    };
    // Get the list ref
    this.getListRef = () => this.flatList;
    // Index that works across Android's weird rtl bugs
    this._rtlSafeIndex = i =>
      isAndroidRTL ? this.props.data.length - 1 - i : i;
    // Render a slide
    this._renderItem = flatListArgs => {
      const {width, height} = this.state;
      const props = {...flatListArgs, dimensions: {width, height}};
      return (
        <react_native_1.View
          style={{
            width,
            position: 'relative',
          }}>
          {this.props.renderItem(props)}
          <TouchableOpacity
            onPress={() => {
              clearTimeout(this.timer1);
              clearTimeout(this.timer2);
              clearTimeout(this.timer3);
              this.props.onDone();
            }}
            style={styles.skipContainerView}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          {/* <View style={{position: 'absolute', left: 0, top: 0}}>
          {this.props.renderPagination
          ? this.props.renderPagination(this.state.activeIndex)
          : this._renderPagination()}
          </View> */}
        </react_native_1.View>
      );
    };
    this._renderButton = (name, label, onPress, render) => {
      const content = render
        ? render()
        : this._renderDefaultButton(name, label);
      return this._renderOuterButton(content, name, onPress);
    };
    this._renderDefaultButton = (name, label) => {
      let content = (
        <react_native_1.View style={styles.buttonViewContainer}>
          <react_native_1.Text style={styles.buttonText}>
            {label}
          </react_native_1.Text>
        </react_native_1.View>
      );
      if (this.props.bottomButton) {
        content = (
          <react_native_1.View
            style={[
              name === 'Skip' || name === 'Prev'
                ? styles.transparentBottomButton
                : styles.bottomButton,
              {width: 120, height: 40, backgroundColor: Colors.primary},
            ]}>
            {content}
          </react_native_1.View>
        );
      }
      return content;
    };
    this._renderOuterButton = (content, name, onPress) => {
      const style =
        name === 'Skip' || name === 'Prev'
          ? styles.leftButtonContainer
          : styles.rightButtonContainer;
      return (
        <react_native_1.View style={!this.props.bottomButton && style}>
          <react_native_1.TouchableOpacity
            onPress={onPress}
            style={this.props.bottomButton && styles.flexOne}>
            {content}
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      );
    };
    this._renderNextButton = () => {};
    this._renderPrevButton = () =>
      this.props.showPrevButton &&
      this._renderButton(
        'Prev',
        this.props.prevLabel,
        () => this.goToSlide(this.state.activeIndex - 1, true),
        this.props.renderPrevButton,
      );
    this._renderDoneButton = () =>
      this._renderButton(
        'Done',
        this.props.skipLabel,
        () => {
          clearTimeout(this.timer1);
          clearTimeout(this.timer2);
          clearTimeout(this.timer3);
          this.props.onDone();
        },
        this.props.renderSkipButton,
      );
    this._renderSkipButton = () =>
      // scrollToEnd does not work in RTL so use goToSlide instead
      this.props.showSkipButton &&
      this._renderButton(
        'Skip',
        this.props.skipLabel,
        () => {
          clearTimeout(this.timer1);
          clearTimeout(this.timer2);
          clearTimeout(this.timer3);
          this.props.onDone();
        },
        this.props.renderSkipButton,
      );
    this._renderPagination = () => {
      const isLastSlide = this.state.activeIndex === this.props.data.length - 1;
      const secondaryButton = this._renderSkipButton();
      const primaryButton = isLastSlide
        ? this._renderDoneButton()
        : this._renderNextButton();
      return (
        <View>
          <SafeAreaView>
            <View>
              {
                <View style={styles.dotContainerView}>
                  <View>
                    <react_native_1.View style={styles.paginationDots}>
                      {this.props.data.length > 1 &&
                        this.props.data.map((_, i) =>
                          this.props.dotClickEnabled ? (
                            <react_native_1.TouchableOpacity
                              key={i}
                              style={[
                                styles.dot,
                                this._rtlSafeIndex(i) === this.state.activeIndex
                                  ? this.props.activeDotStyle
                                  : this.props.dotStyle,
                              ]}
                              onPress={() => this.goToSlide(i, true)}
                            />
                          ) : (
                            <react_native_1.View
                              key={i}
                              style={[
                                styles.dot,
                                this._rtlSafeIndex(i) === this.state.activeIndex
                                  ? this.props.activeDotStyle
                                  : this.props.dotStyle,
                              ]}
                            />
                          ),
                        )}
                    </react_native_1.View>
                  </View>
                </View>
              }
              {primaryButton}
              {secondaryButton}
            </View>
          </SafeAreaView>
        </View>
      );
    };
    this._onMomentumScrollEnd = e => {
      const offset = e.nativeEvent.contentOffset.x;
      // Touching very very quickly and continuous brings about
      // a variation close to - but not quite - the width.
      // That's why we round the number.
      // Also, Android phones and their weird numbers
      const newIndex = this._rtlSafeIndex(
        Math.round(offset / this.state.width),
      );
      if (newIndex === this.state.activeIndex) {
        // No page change, don't do anything
        return;
      }
      const lastIndex = this.state.activeIndex;
      this.setState({activeIndex: newIndex});
      this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
    };
    this._onLayout = ({nativeEvent}) => {
      const {width, height} = nativeEvent.layout;
      if (width !== this.state.width || height !== this.state.height) {
        // Set new width to update rendering of pages
        this.setState({width, height});
        // Set new scroll position
        const func = () => {
          this.flatList?.scrollToOffset({
            offset: this._rtlSafeIndex(this.state.activeIndex) * width,
            animated: false,
          });
        };
        setTimeout(func, 0); // Must be called like this to avoid bugs :/
      }
    };
  }
  timer1 = setTimeout(() => {
    this.goToSlide(this.state.activeIndex + 1, true);
  }, 5000);
  timer2 = setTimeout(() => {
    this.goToSlide(this.state.activeIndex + 1, true);
  }, 8000);
  timer3 = setTimeout(() => {
    this.goToSlide(this.state.activeIndex + 1, true);
  }, 11000);
  componentDidMount() {
    return () => {
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
    };
  }
  render() {
    // Separate props used by the component to props passed to FlatList
    const {
      renderPagination,
      activeDotStyle,
      dotStyle,
      skipLabel,
      doneLabel,
      nextLabel,
      prevLabel,
      renderItem,
      data,
      extraData,
      ...otherProps
    } = this.props;
    // Merge component width and user-defined extraData
    const extra = merge_extradata_1.default(extraData, this.state.width);
    return (
      <react_native_1.View style={styles.flexOne}>
        <react_native_1.FlatList
          ref={ref => (this.flatList = ref)}
          data={this.props.data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.flatList}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          extraData={extra}
          onLayout={this._onLayout}
          // make sure all slides are rendered so we can use dots to navigate to them
          initialNumToRender={data.length}
          {...otherProps}
        />
        {/* {secondaryButton} */}
        {renderPagination
          ? renderPagination(this.state.activeIndex)
          : this._renderPagination()}
      </react_native_1.View>
    );
  }
}
exports.default = AppIntroSlider;
AppIntroSlider.defaultProps = {
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  dotClickEnabled: true,
  skipLabel: 'Skip',
  doneLabel: 'Done',
  nextLabel: 'Next',
  prevLabel: 'Back',
  showDoneButton: true,
  showNextButton: true,
  showPrevButton: false,
  showSkipButton: false,
  bottomButton: false,
};
const styles = react_native_1.StyleSheet.create({
  flexOne: {
    flex: 1,
    position: 'relative',
  },
  flatList: {
    flex: 1,
    width: '100%',
    // height: 100,
    // aspectRatio: 0.7,
    // resizeMode: 'contain',
    flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
  },
  paginationContainer: {
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  paginationDots: {
    flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
    paddingHorizontal: SCREEN_WIDTH * 0.045,
  },
  dot: {
    width: 2,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0,
  },
  bottomButton: {
    flex: 1,
  },
  transparentBottomButton: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
  skipContainerView: {
    backgroundColor: Colors.primary,
    paddingVertical:
      SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.0085 : SCREEN_HEIGHT * 0.011,
    paddingHorizontal:
      SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.03 : SCREEN_HEIGHT * 0.03,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    right: 40,
    alignSelf: 'center',
  },
  dotContainerView: {
    position: 'absolute',
    bottom: 40,
    left: SCREEN_WIDTH < 800 ? '34%' : '40%',
  },
  buttonViewContainer: {
    height: 40,
    backgroundColor: '#21409A',
    position: 'absolute',
    bottom: -windowWidth * 1.55,
    left: windowWidth * 0.39,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  skipText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
  },
  containerStyleFullWidth: {
    height:
      SCREEN_HEIGHT > 400 && SCREEN_HEIGHT <= 800
        ? SCREEN_HEIGHT * 0.06
        : SCREEN_HEIGHT <= 400
        ? SCREEN_HEIGHT * 0.04
        : 45,
    marginTop: '1%',
    marginRight: '5%',
    borderRadius: 50,
  },
});
