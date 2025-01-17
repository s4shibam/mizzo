export const getGreetingMessage = (name = '') => {
  const currentHour = new Date().getHours()
  let text = ''

  if (currentHour >= 5 && currentHour < 12) {
    text = 'Good Morning'
  } else if (currentHour >= 12 && currentHour < 17) {
    text = 'Good Afternoon'
  } else if (currentHour >= 17 && currentHour < 22) {
    text = 'Good Evening'
  } else {
    text = 'Happy Late Night'
  }

  if (name) {
    text += `, ${name}`
  }

  return text + '!'
}
