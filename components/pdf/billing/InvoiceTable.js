import { StyleSheet, Text, View } from "@react-pdf/renderer"
import { messages } from "utils/messages"
import { InvoiceTableHeader } from "./InvoiceTableHeader"
import { InvoiceTableRows } from "./InvoiceTableRows"

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#999999",
  },
  titleContainer: {
    paddingLeft: 8,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
})

export const InvoiceTable = ({ invoice, date, isGestor }) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text>{`${messages.ui.pdf.billing.detail}${date}`}</Text>
      </View>

      <View style={styles.tableContainer}>
        <InvoiceTableHeader isGestor={isGestor} />
        <InvoiceTableRows items={invoice.jobs} isGestor={isGestor} />
      </View>
    </>
  )
}
