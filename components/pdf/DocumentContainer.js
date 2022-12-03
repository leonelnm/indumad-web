import { Page, Document, StyleSheet } from "@react-pdf/renderer"
import { messages } from "utils/messages"

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 40,
    fontSize: 12,
  },
})

export default function DocumentContainer({
  children,
  orientation = "portrait",
}) {
  const appname = messages.ui.appName
  return (
    <Document language="es-ES" creator={appname} producer={appname}>
      <Page size="A4" orientation={orientation} style={styles.body}>
        {children}
      </Page>
    </Document>
  )
}
