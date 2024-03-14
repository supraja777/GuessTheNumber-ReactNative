import { View, StyleSheet,Dimensions } from "react-native"
import Colors from "../../constants/colors"
function Card({children}) {
    return <View style={styles.card}>{children}</View>
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignContent: "center",
        padding: 60,
        marginTop: deviceWidth<450? 18:36,
        backgroundColor: Colors.primary800,
        marginHorizontal: 29,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        height: 250,
        width: 300,
      },
})

export default Card