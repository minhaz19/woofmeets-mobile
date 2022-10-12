import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const checkConnectivity = () => {
    return new Promise(resolve => {
        if (Platform.OS === "android") {
            // For Android devices
            NetInfo.fetch().then(state => {
                resolve(state.isInternetReachable);
            });
        } else {
            // For iOS devices
            const unsubscribe = NetInfo.addEventListener(state => {
                unsubscribe();
                resolve(state.isInternetReachable);
            });
        }
    });
};

export default checkConnectivity;