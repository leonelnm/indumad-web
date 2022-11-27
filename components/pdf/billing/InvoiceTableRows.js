import { StyleSheet, Text, View } from "@react-pdf/renderer"
import { getDate } from "utils/date"
import { formatCurrency } from "utils/utils"

const borderColor = "#eeeeee"

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#999999",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    fontSize: 11,
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
    textAlign: "left",
    paddingLeft: 8,
  },
  address: {
    width: "32%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: 8,
  },
  import: {
    width: "10%",
    textAlign: "right",
    paddingRight: 8,
  },
})

export const InvoiceTableRows = ({ items = [], isGestor }) => {
  return (
    <>
      {items.map((item) => (
        <View style={styles.container} key={item.end}>
          <Text style={styles.job}>{item.id}</Text>
          <Text style={styles.date}>{getDate(item.start)}</Text>
          <Text style={styles.date}>{getDate(item.end)}</Text>
          <Text style={styles.client}>{item.client}</Text>
          <Text style={styles.client}>
            {isGestor ? item.worker : item.contact}
          </Text>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.import}>{formatCurrency.format(item.price)}</Text>
        </View>
      ))}
    </>
  )
}
