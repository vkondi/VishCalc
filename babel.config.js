module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'], //  This says the root of your project folder
        // extensions: [
        //   '.ios.ts',
        //   '.android.ts',
        //   '.ts',
        //   '.ios.tsx',
        //   '.android.tsx',
        //   '.tsx',
        //   '.jsx',
        //   '.js',
        //   '.json',
        // ],
        // To make your imports look better
        // Insert your whatever name to make alias for the imports
        // In this example I'm using @components to referring the components folder
        // That located inside src folder.
        // Note: You can make a lot of aliases in here
        alias: {
          '@components': './src/Components',
          '@constants': './src/Constants',
          '@utilities': './src/Utilities',
        },
      },
    ],
  ],
};
