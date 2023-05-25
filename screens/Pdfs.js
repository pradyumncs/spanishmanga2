import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, Button,  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated } from 'react-native';
import Pdf from 'react-native-pdf';
import { printToFileAsync } from 'expo-print';
import { FONTS, COLORS, SIZES, icons } from "../constants";

// npx expo install react-native-pdf react-native-blob-util fbjs @config-plugins/react-native-pdf @config-plugins/react-native-blob-util

/*
Configure build profiles: 
eas build:configure

Install expo dev client:
npx expo install expo-dev-client

Build standalone app for dev profile:
eas build -p ios --profile development
OR
eas build -p android --profile development

Install standalone app:
For iOS (simulator): https://docs.expo.dev/build-reference/simulators/
For Android: https://docs.expo.dev/build-reference/apk/

Run standalone app:
expo start --dev-client
*/

export default function Pdfs({ route, navigation }) {
  const onlineSource = { uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true };
  const [pdfSource, setPdfSource] = useState(onlineSource);
  const pdfRef = useRef();

  const generatePdf = async (generateBase64) => {
    const html = `
      <html>
        <body style="margin:32px;">
          <h1>Hi YouTube</h1>
          <h2>Base64: ${generateBase64.toString()}</h2>
        </body>
      </html>
    `;

    const fileGenerated = await printToFileAsync({
      html: html,
      base64: generateBase64
    });

    console.log(fileGenerated.base64);
    console.log(fileGenerated.uri);

    const newSource = {
      uri: generateBase64 ? `data:application/pdf;base64,${fileGenerated.base64}` : fileGenerated.uri,
      cache: true
    };
    setPdfSource(newSource);
  }

  //<Button title="Generate and Show" onPress={() => generatePdf(false)} />
  //<Button title="Generate and Show Base64" onPress={() => generatePdf(true)} />
 // <Button title="Show Base64 PDF" onPress={() => setPdfSource({ uri: `data:application/pdf;base64,${MyPdf}`, cache: true })} />
 //<Button title="Show Online PDF" onPress={() => setPdfSource(onlineSource)} />
  return (
    <SafeAreaView style={styles.container}>
     
      <TouchableOpacity
                        style={{ margin: 20 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon2}
                            resizeMode="contain"
                            style={{
                                width: 80,
                                height: 80,
                               
                            }}
                        />
                    </TouchableOpacity>
      <Pdf
        trustAllCerts={false}
        ref={pdfRef} 
        source={pdfSource}
        horizontal
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  pdf: {
    flex: 1,
    alignSelf: "stretch",
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
});
