import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Image,ImageBackground } from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Buttons({ route, navigation }) {
  const itemsPerPage = 30;
  const [totalItems, settotalItems] = React.useState(150);
  //const totalItems = 100
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [bookaa, setBook] = React.useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookaimg, setBookimg] = React.useState();

  const buttons = Array.from({ length: totalItems }, (_, index) => ({
    title: `Chapter ${index + 1}`,
   // onPress: () => console.log(`Chapter ${index + 1} pressed`),
   onPress: () => navigation.navigate("Pdfs"
   ),
   
  }));

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleButtons = buttons.slice(startIndex, endIndex);

  React.useEffect(() => {
    let { bookaa } = route.params;
    setBook(bookaa)
    console.log(bookaa.author)
    settotalItems(bookaa.pageNo)
    setBookimg(bookaa.bookCover)
}, [bookaa])

 
  

  return (
    <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 80,width: 20, alignItems: 'flex-end' }}></View>
        <ImageBackground
                    source={bookaimg}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                />
                 <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: {bookaimg}
                    }}
                >
                </View>
       <TouchableOpacity
                        style={{ marginLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                               
                            }}
                        />
                    </TouchableOpacity>
      <View style={styles.pagination}>
        <Button title="Prev" onPress={handlePrevPage} disabled={currentPage === 1} />
        <Text style={styles.pageCount}>{`Page ${currentPage} of ${totalPages}`}</Text>
        
          
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        />
       

      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.grid}>
          {visibleButtons.map((button, index) => (
            <Button key={index} title={button.title} onPress={button.onPress} />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  pageCount: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});
