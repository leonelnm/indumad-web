import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { getDate } from "utils/date"
import { messages } from "utils/messages"
import DocumentContainer from "./DocumentContainer"

const styles = StyleSheet.create({
  indumadTitle: {
    fontSize: 20,
    marginBottom: 40,
    color: "#1C3879",
  },
  deliveryTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  section: {
    padding: 5,
    marginBottom: 10,
    border: "1px solid #eeeeee",
  },
  sectionGrow: {
    padding: 5,
    marginBottom: 10,
    border: "1px solid #eeeeee",
    borderLeft: "none",
    flexGrow: 1,
  },
  job: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "75%",
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 5,
  },
  container: {
    paddingLeft: 15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInfo: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 4,
  },
  columnInfo: {
    display: "flex",
  },
  caption: {
    fontFamily: "Helvetica-BoldOblique",
    fontSize: 9,
    width: 50,
  },
  columncaption: {
    fontFamily: "Helvetica-BoldOblique",
    fontSize: 9,
  },
  text: {
    fontSize: 10,
  },
  columntext: {
    textAlign: "center",
    fontSize: 10,
  },
  boxContactClient: {
    display: "flex",
    flexDirection: "row",
  },
  sign: {
    border: "1px solid grey",
    padding: 10,
    color: "grey",
    fontSize: 10,
    height: 80,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
})

const Section = ({ children, title, grow = false }) => {
  return (
    <View style={grow ? styles.sectionGrow : styles.section}>
      {title && <Text style={styles.subtitle}>{title}:</Text>}
      <View style={title ? styles.container : ""}>{children}</View>
    </View>
  )
}

const Info = ({ caption, text, column = false }) => {
  return (
    <View style={column ? styles.columnInfo : styles.rowInfo}>
      <Text style={column ? styles.columncaption : styles.caption}>
        {caption}:
      </Text>
      <Text style={column ? styles.columntext : styles.text}>
        {text || "---"}
      </Text>
    </View>
  )
}

const parseHtmltoString = (text = "", first = false, separator = "|") => {
  if (!text) {
    return ""
  }

  let txtWithoutHtmlTag = ""
  if (first) {
    txtWithoutHtmlTag = text.replace(/<[^>]+>/g, separator)
  } else {
    txtWithoutHtmlTag = text.replace(/\|\|/g, separator)
  }

  if (text === txtWithoutHtmlTag) {
    return txtWithoutHtmlTag
  } else {
    txtWithoutHtmlTag = parseHtmltoString(txtWithoutHtmlTag)
  }

  return txtWithoutHtmlTag
}

export const DeliveryNotePdf = ({ job = {} }) => {
  const txtWithoutHtmlTag = parseHtmltoString(job.incidentInfo, true)

  return (
    <DocumentContainer>
      <View style={styles.indumadTitle}>
        <Text>{messages.ui.appName}</Text>
      </View>
      <View style={styles.deliveryTitle}>
        <Text>{messages.ui.pdf.deliveryNote}</Text>
      </View>
      <View style={styles.job}>
        <View>
          <Section>
            <View style={styles.row}>
              <Info
                caption={messages.ui.pdf.service}
                text={job.id}
                column={true}
              />
              <Info
                caption={messages.ui.job.externalReference}
                text={job.extReference}
                column={true}
              />
              <Info
                caption={messages.ui.job.createdAt}
                text={getDate(job.createdAt)}
                column={true}
              />
              <Info
                caption={messages.ui.job.reference}
                text={`${job.reference.name} - ${job.guild.name}`}
                column={true}
              />
              <Info
                caption={messages.ui.job.worker}
                text={`${job.employee.name} ${job.employee.lastname}`}
                column={true}
              />
            </View>
          </Section>
          <View style={styles.boxContactClient}>
            <Section title={messages.ui.job.client}>
              <Info caption={messages.ui.job.nif} text={job.client.nif} />
              <Info caption={messages.ui.job.name} text={job.client.name} />
              <Info caption={messages.ui.job.phone} text={job.client.phone} />
            </Section>
            <Section title={messages.ui.job.contact} grow={true}>
              <Info caption={messages.ui.job.name} text={job.contact.name} />
              <Info caption={messages.ui.job.phone} text={job.contact.phone} />
              <Info
                caption={messages.ui.job.address}
                text={job.contact.address}
              />
            </Section>
          </View>
          <Section title={messages.ui.job.description}>
            {txtWithoutHtmlTag.split("|").map((item, idx) => (
              <Text key={idx} style={styles.text}>
                {item}
              </Text>
            ))}
          </Section>
        </View>

        <View style={styles.sign} wrap={false}>
          <Text>{messages.ui.pdf.sign}</Text>
        </View>
      </View>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </DocumentContainer>
  )
}
