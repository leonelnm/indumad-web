import { StyleSheet, Text, View } from "@react-pdf/renderer"

const borderColor = "#c4c4c4"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#999999",
    backgroundColor: "#eeeeee",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  job: {
    width: "8%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  client: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  address: {
    width: "32%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  import: {
    width: "10%",
  },
})

export const InvoiceTableHeader = ({ isGestor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.job}>Trabajo</Text>
      <Text style={styles.date}>Inicio</Text>
      <Text style={styles.date}>Fin</Text>
      <Text style={styles.client}>Cliente</Text>
      <Text style={styles.client}>{isGestor ? "Responsable" : "Contacto"}</Text>
      <Text style={styles.address}>Dirección</Text>
      <Text style={styles.import}>Importe</Text>
    </View>
  )
}
