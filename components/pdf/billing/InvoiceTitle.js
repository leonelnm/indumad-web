import { StyleSheet, Text, View } from "@react-pdf/renderer"
import { messages } from "utils/messages"
const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    color: "#1C3879",
    textAlign: "right",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 14,
    marginBottom: 32,
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
})

export const InvoiceTitle = ({ isRemesa = false, fullname, isGestor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{messages.ui.appName}</Text>

      {!isGestor && <Text style={styles.name}>{fullname}</Text>}

      <Text style={styles.subtitle}>
        {isRemesa
          ? messages.ui.pdf.billing.remesaDetails
          : messages.ui.pdf.billing.invoice}
      </Text>
    </View>
  )
}
