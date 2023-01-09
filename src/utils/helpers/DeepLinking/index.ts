const config = {
    screens: {
        BottomTabNavigator: {
          screens: {
            InboxNavigator:{
              screens: {
                Inbox: {
                    path:'inboxNavigator',
                },
              },
            },
            PetNavigator: {
                screens: {
                    MyPet: {
                        path: 'myPet',
                    },
                },
            },
            ServiceNavigator: {
                screens: {
                    PetCareZipSearch: {
                        path: 'services',
                    },
                },
            },
          },
      },
    },
  };

const linking = {
    prefixes: ['woofmeets://app', 'woofmeets://inboxNavigator'],
    config,
};

export default linking;
