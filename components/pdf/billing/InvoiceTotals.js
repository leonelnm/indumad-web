import { StyleSheet, Text, View } from "@react-pdf/renderer"
import { formatCurrency } from "utils/utils"

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  captionvalue: {
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    width: "89%",
    textAlign: "right",
    paddingRight: 8,
  },
  value: {
    width: "11%",
    textAlign: "right",
    padding: 4,
    paddingRight: 8,
    borderColor: "#999999",
    borderWidth: 1,
  },
})

export const InvoiceTotals = ({ invoice }) => {
  return (
    <View style={styles.container}>
      <CaptionValue
        caption={"Subtotal"}
        value={formatCurrency.format(invoice.subtotal)}
      />
      <CaptionValue
        caption={"IVA 21%"}
        value={formatCurrency.format(invoice.iva)}
      />
      <CaptionValue
        caption={"Total"}
        value={formatCurrency.format(invoice.total)}
      />
    </View>
  )
}

const CaptionValue = ({ caption, value }) => {
  return (
    <View style={styles.captionvalue}>
      <Text style={styles.caption}>{caption}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}
