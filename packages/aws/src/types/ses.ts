type TEmailContent = {
  subject: string
  htmlBody: string
  textBody?: string
}

export type TSendEmailParams = {
  toAddresses: string[]
  content: TEmailContent
  fromAddress?: string
}
