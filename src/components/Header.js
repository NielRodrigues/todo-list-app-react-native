import { View, StyleSheet, Image, Text } from "react-native";
import user from "../../assets/user.png"
import colors from "../config/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image style={styles.user_picture} source={user} />
      <View style={styles.textContent}>
        <Text style={styles.saud}>Good Morning</Text>
        <Text style={styles.name}>Name!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 12,
  },

  user_picture: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  textContent: {
    display: 'flex',
    flexDirection: 'column',
  },

  saud: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '100',
    margin: 0,
    marginBottom: -4,
  },

  name: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 0,
  },
});
