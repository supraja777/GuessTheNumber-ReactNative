import { TextInput, View, StyleSheet,Alert, useWindowDimensions } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/game/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
function StartGameScreen({pickedNumberHandler}) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const {height, width} = useWindowDimensions()

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText)
  }

  function resetInputHandler() {
    setEnteredNumber("")
  }

  function confirmInputHandler() {

    const chosenNumber = parseInt(enteredNumber)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
        console.log("Invalid number")
        Alert.alert(
          'Invalid number!',
          'Number has to be a number between 1 and 99.',
          [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
        );
        return;
    }

    pickedNumberHandler(chosenNumber);
  }

  const marginTopDistance = height<400? 30: 100;

  return (
    <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
      <Title>Guess My Number</Title>
   
    <Card>
      <InstructionText >Enter a number</InstructionText>
      <TextInput
        style={styles.numberInput}
        value={enteredNumber}
        onChangeText={numberInputHandler}
        keyboardType="number-pad"
      />
      <View style={styles.buttonsContainer}>
        <View>
          <PrimaryButton style={styles.buttonContainer} onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </Card>
    </View>
  );
}

// const deviceHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
   
    alignItems: 'center'
  },  
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
