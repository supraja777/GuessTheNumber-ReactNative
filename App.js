import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen"
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";

export default function App() {

  const [userNumber,setUserNumber] = useState()
  const [gameIsOver, setIsGameOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  function pickedNumberHandler(pickedNumber) {
      setUserNumber(pickedNumber)
      setIsGameOver(false)
  }

  function gameOverHandler(numberOfRounds) {
    setIsGameOver(true)
    setGuessRounds(numberOfRounds)
  }

  function onStartNewGameHandler () {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen pickedNumberHandler = {pickedNumberHandler}/>

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} gameOverHandler={gameOverHandler}/>
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen roundsNumber ={guessRounds} userNumber = {userNumber} onStartNewGameHandler = {onStartNewGameHandler}/>
  }

  return (
    <LinearGradient colors={[Colors.primary1000, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
        {screen}
        </SafeAreaView>
     
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});
