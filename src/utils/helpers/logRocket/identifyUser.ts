import LogRocket from '@logrocket/react-native';

export const identifyLogRocketUser = (userData: any) => {
  if (
    userData?.opk &&
    userData?.email &&
    userData?.firstName &&
    userData?.lastName
  ) {
    LogRocket.identify(userData?.opk, {
      name: `${userData?.firstName} ${userData?.lastName}`,
      email: userData?.email,
    });
  }
};
