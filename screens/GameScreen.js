import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Title from '../components/game/Title';
import {useState, useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import Icon from 'react-native-vector-icons/FontAwesome';
import GuessLogItem from '../components/game/GuessLogItem';

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, gameOverHandler}) {
  const {width, height} = useWindowDimensions();
  function generateRandomBetween(min, max, exclude) {
  

    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (userNumber == currentGuess) {
      gameOverHandler(guessRounds.length);
    }
  }, [currentGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    // direction => 'lower', 'greater'
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );

    console.log(minBoundary, maxBoundary);
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;
  const screenWidth = width
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.InstructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.buttonContainer}
            onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
          <PrimaryButton
            style={styles.buttonContainer}
            onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
        </View>
      </Card>
    </>
  );

  if (screenWidth> 500) {
     content = (<>
       

        <View style={styles.buttonContainerWide}>
       
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.buttonContainer}
            onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <PrimaryButton
            style={styles.buttonContainer}
            onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
        </View>
        </View>

      
    </>)
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              opponentGuess={itemData.item}
            />
          )}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  InstructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 16
  },
  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
